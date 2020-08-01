import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = (props) => {
	return (
		<div className="center ma">
			<div className="absolute mt2 pb3 pt3">
				<img id="inputimage" alt="" src={props.imageUrl} width="500px" height="auto"/>
				<div className="bounding-box" style={{top: props.box.top_row, bottom: props.box.bottom_row, left: props.box.left_col, right: props.box.right_col}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;