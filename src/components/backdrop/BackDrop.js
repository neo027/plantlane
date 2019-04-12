import React from 'react';

import './BackDrop.css';

const backdrop = (props) => {

	return (
		<div onClick={props.onClick} className={"plantlane-backdrop" + (props.show ? " show" : "")}></div>
	);
}

export default backdrop;