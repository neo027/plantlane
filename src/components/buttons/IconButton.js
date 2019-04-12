import React from 'react';


import './IconButton.css';

const iconButton = (props) => {

	return (
		<button 
			onClick={props.onClick} 
			className={
				"plantlane-btn-icon" + 
				(props.animate ? " plantlane-btn-icon-animation" : "") + 
				(props.round ? " plantlane-btn-icon-round" : "") + 
				(props.className ? " " + props.className : "") 
			}
		>
			{props.children}
		</button>
	);
}

export default iconButton;