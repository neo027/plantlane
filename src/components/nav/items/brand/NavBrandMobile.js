import React from 'react';
import {Link} from 'react-router-dom';

import './NavBrandMobile.css';

const navBrandMobile = (props) => {

	return (
		<React.Fragment>
			<Link onClick={props.onClick} to={'/'}><div className="plantlane-navbrand-mobile-logo">plantlane</div></Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
		</React.Fragment>
	);
}

export default navBrandMobile;