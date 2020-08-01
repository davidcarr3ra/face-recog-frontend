import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import InputForm from "./components/inputform/InputForm";
import Rank from "./components/rank/Rank";
import Particles from 'react-particles-js';
import Clarifai from "clarifai";
import FaceRecognition from "./components/facerecog/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const particles_options = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

const app = new Clarifai.App({
 apiKey: 'cbb5821ad8474ccaa88a921e1bd2b849'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: "",
      route: "signin",
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    const face_coords = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left_col: face_coords.left_col * width,
      right_col: width - (face_coords.right_col * width),
      top_row: face_coords.top_row * height,
      bottom_row: height - (face_coords.bottom_row * height)
    }
  }

  displayFaceBox = (box_coords) => {
    this.setState({box: box_coords});
    console.log(box_coords);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => {
        console.log(err);
      });
  }

  onEnterKey = (target) => { // note: same as above but takes argument
    if(this.state.input.length > 0 && target.charCode === 13) {
      this.setState({imageUrl: this.state.input});
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
        .then(response => {
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(err => {
          console.log(err);
        });
    }
    
  }

  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState({isSignedIn: false});
    } else if(route === "home") {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
            params={particles_options}
        /> 
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === "home"
          ? <div>
              <Logo />
              <div style={{position: "relative", top: "-50px"}}>
                <Rank />
                <InputForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                onEnterKey={this.onEnterKey}
                />
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
              </div>
            </div>
          : (
              this.state.route === "signin"
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
