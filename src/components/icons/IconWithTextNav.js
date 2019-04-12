import React from 'react';

import './IconWithTextNav.css';

const iconWithTextNav = (props) => {

	return (
		<div className="plantlane-icon-with-text-nav">
			{
				props.image ? 
					<img style={props.iconStyles} src={props.icon} alt={props.text} /> :
					<span style={props.iconStyles} className={props.icon}></span>
			}
			<div style={props.textStyle} className={props.capitalize ? " plantlane-capitalize" : ""}>{props.text}</div>
		</div>
	);
}

export default iconWithTextNav;