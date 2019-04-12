import React from 'react';
import {Link} from 'react-router-dom';

import './NavLogout.css';

const navLogout = (props) => {

	return (
		<li className="nav-item form-inline ml-xl-3"><Link className={"btn btn-sm plantlane-logout-btn" + (props.btnClass ? " " + props.btnClass : "")} to="/logout">Logout</Link></li>
	);
}

export default navLogout;