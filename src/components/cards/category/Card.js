import React from 'react';
import {Link} from 'react-router-dom';

import './Card.css';

const card = (props) => {

	return (
		<Link to={props.link} className="plantlane-category-card t-decor-0">
			<img src={props.image} alt={props.category} />
			<div className="plantlane-category-card-text plantlane-hide-overflow">{props.category}</div>
		</Link>
	);
}

export default card;