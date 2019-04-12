import React from 'react';

import './Card.css';

const card = (props) => {

	return (
		<div className="plantlane-brand-card">
			<img src={props.image} alt={props.name}/>
		</div>
	);
}

export default card;