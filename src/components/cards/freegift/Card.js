import React from 'react';

import {stripHtml} from '../../../utilities';

import './Card.css';

const card = (props) => {
	return (
		<div className={"plantlane-freegift-product-card" + (props.className ? " " + props.className : "")}>
			{props.badge && <div className="plantlane-freegift-badge">{props.badge}</div>}
			<div className="plantlane-freegift-product-tumb">
				<img src={props.image} alt={props.name} />
			</div>
			<div className="plantlane-freegift-product-details">
				{props.category && <span className="plantlane-freegift-product-catagory">{props.category}</span>}
				<h4><div className="plantlane-hide-overflow">{props.name}</div></h4>
				<p className="plantlane-hide-overflow">{props.text ? stripHtml(props.text.value).replace('<p>', '').replace('</p>', '') : '.'}</p>
				<div className="plantlane-freegift-product-bottom-details">
					<button onClick={props.handleClaimGift} className="btn plantlane-btn-primary btn-block btn-sm">Claim</button>
				</div>
			</div>
		</div>
	);
}

export default card;