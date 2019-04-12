import React from 'react';

import './NavLoginButton.css';

const navLoginButton = (props) => {

	return (
		<li className="nav-item"><div onClick={props.onClick} className="nav-link plantlane-nav-login-btn">Login <span className="align-middle plantlane-nav-login-btn-icon"></span></div></li>
	);
}

export default navLoginButton;