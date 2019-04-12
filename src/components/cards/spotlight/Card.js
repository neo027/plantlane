import React from 'react';
import {Link} from 'react-router-dom';

import {stripHtml} from '../../../utilities';

import './Card.css';

const card = (props) => {

	return (
		<Link to={props.link} className="plantlane-spotlight-card t-decor-0">
			<img className="plantlane-spotlight-card-image" src={props.image} alt={props.category} />
			<div className="plantlane-spotlight-card-text-container">
				<h5 className="plantlane-hide-overflow">{props.category}</h5>
				<div className="plantlane-hide-overflow">{stripHtml(props.text)}</div>
			</div>
		</Link>
	);
}

export default card;