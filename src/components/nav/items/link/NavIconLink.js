import React from 'react';
import {Link} from 'react-router-dom';

import './NavIconLink.css';

const navIconLink = (props) => {

	return (
		<li className="nav-item">
		{
			props.to
			?
	        	<Link className={"nav-link " + props.className} to={props.to}>
	        		<img className="align-middle plantlane-nav-link-icon" src={props.icon} alt={props.alt}/> 
	        		{props.count && <span className="plantlane-nav-link-icon-badge">{props.count}</span>}
	        	</Link>
	        :
				<div onClick={props.onClick} className={"nav-link " + props.className}>
	        		<img className="align-middle plantlane-nav-link-icon" src={props.icon} alt={props.alt}/> 
	        		{props.count && <span className="plantlane-nav-link-icon-badge">{props.count}</span>}
	        	</div>
		}
	    </li>
	);
}

export default navIconLink;