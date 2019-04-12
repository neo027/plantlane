import React from 'react';
import {Link} from 'react-router-dom';

import {stripHtml} from '../../../utilities';

import './Card.css';

const card = (props) => {

	return (
		<Link to={props.link} className="plantlane-gift-card t-decor-0">
			<img className="plantlane-gift-card-image" src={props.image} alt={props.category} />
			<div className="plantlane-gift-card-text-container">
				<h5 className={"plantlane-hide-overflow " + (props.capitalize ? "plantlane-capitalize" : "")}>{props.category}</h5>
				<div className="plantlane-gift-card-description plantlane-hide-overflow">{stripHtml(props.text)}</div>
			</div>
		</Link>
	);
}

export default card;