import React from 'react';

import trendingIcon from '../../../assets/trending.png';

import './Card.css';

const card = (props) => {

	return (
		<div className="plantlane-trendingsearch-card">
			<div className="plantlane-trendingsearch-card-text plantlane-hide-overflow">{props.searchText}</div>
			<img className="plantlane-trendingsearch-card-image" src={trendingIcon} alt="trending" />
		</div>
	);
}

export default card;