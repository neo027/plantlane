import React from 'react';
import {Link} from 'react-router-dom';

import './Card.css';

const card = (props) => {

	return (
		<Link to={props.link} className="plantlane-house-card t-decor-0">
			<img className="plantlane-house-card-image" src={props.image} alt={props.category} />
			<div className="plantlane-house-card-text-container">
				<h5 className={"plantlane-hide-overflow " + (props.capitalize ? "plantlane-capitalize" : "")}>{props.category}</h5>
				<div className="plantlane-hide-overflow">{props.text}</div>
			</div>
		</Link>
	);
}

export default card;