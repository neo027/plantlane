import React from 'react';
import {Link} from 'react-router-dom';

import './NavIconLinkMobile.css';

const navIconLinkMobile = (props) => {

	return (
		<div>
		{
			props.to
			?
	        	<Link to={props.to}>
	        		<img className="align-middle plantlane-nav-link-mobile-icon" src={props.icon} alt={props.alt}/> 
	        		{props.count && <span className="plantlane-nav-link-mobile-icon-badge">{props.count}</span>}
	        	</Link>
	        :
				<div onClick={props.onClick}>
	        		<img className="align-middle plantlane-nav-link-mobile-icon" src={props.icon} alt={props.alt}/> 
	        		{props.count && <span className="plantlane-nav-link-mobile-icon-badge">{props.count}</span>}
	        	</div>
		}
	    </div>
	);
}

export default navIconLinkMobile;