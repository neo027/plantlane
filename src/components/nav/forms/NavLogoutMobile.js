import React from 'react';
import {Link} from 'react-router-dom';

import './NavLogout.css';

const navLogoutMobile = (props) => {

	return (
		<div className="mx-3 my-4"><Link className={"btn btn-sm btn-block plantlane-logout-btn" + (props.btnClass ? " " + props.btnClass : "")} to="/logout">Logout</Link></div>
	);
}

export default navLogoutMobile;