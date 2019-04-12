import React from 'react';
import {Link} from 'react-router-dom';

import './NavLink.css';

const navLink = (props) => {

	return (
			<div className={"plantlane-capitalize my-4" + (props.className ? " " + props.className : "") + (props.active ? " active" : "")}>
		        <Link onClick={props.onClick} className="nav-link plantlane-text-secondry" to={props.to}><span className="align-middle plantlane-nav-login-btn-icon mr-2"></span> {props.text}</Link>
		    </div>
	);
}

export default navLink;