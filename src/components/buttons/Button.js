import React from 'react';

import './Button.css';

const button = (props) => {

	return (
		<button 
			onClick={props.onClick} 
			className={
				"btn plantlane-btn-primary" + 
				(props.animate ? " plantlane-btn-animation" : "") + 
				(props.className ? " " + props.className : "") + 
				(props.capitalize ? " plantlane-capitalize" : "")
			}
		>
			{props.children}
		</button>
	);
}

export default button;