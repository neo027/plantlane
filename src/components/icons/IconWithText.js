import React from 'react';

import './IconWithText.css';

const iconWithText = (props) => {

	return (
		<div className="plantlane-icon-with-text">
			{
				props.image ? 
					<img style={props.iconStyles} src={props.icon} alt={props.text} /> :
					<span style={props.iconStyles} className={props.icon}></span>
			}
			<div className={"" + (props.textClass ? " plantlane-icon-small-text" : "") + (props.capitalize ? " plantlane-capitalize" : "")}>{props.text}</div>
		</div>
	);
}

export default iconWithText;