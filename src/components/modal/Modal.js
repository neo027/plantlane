import React from 'react';


import './Modal.css';

const modal = (props) => {

	return (
		<div style={props.style} className={"plantlane-modal" + (props.show ? " show" : "")}>
			<button onClick={props.close} type="button" className="close plantlane-modal-close" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
			{props.children}
		</div>
	);
}

export default modal;