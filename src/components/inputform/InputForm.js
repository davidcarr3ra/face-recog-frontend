import React from "react";
import "./InputForm.css";

const InputForm = (props) => {
	return (
		<div>
			<p className="f3">
				{"This magic brain will detect faces in your pictures!"}
			</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input
						className="f4 pa2 w-70 center" type="tex"
						onChange={props.onInputChange}
						onKeyDown={props.onEnterKey}
					/>
					<button
						className="w-30 grow f4 link ph3 pv dib white bg-light-purple"
						onClick={props.onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default InputForm;