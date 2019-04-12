import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {fetchChildren} from '../../../api/products';

import {stripHtml} from '../../../utilities';

import './Card.css';

const card = (props) => {

	const [oldPrice, setPrice] = useState(props.oldPrice);
	const [isLoading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);

	useEffect(() => {
		if(props.typeId === 'configurable' && !fetched){
			setLoading(true);
			fetchChildren(props.sku)
	    	.then(children => {
	    		let minPrice = 999999999999999999999999;
	    		children.forEach(child => {
	    			if(parseInt(child.price) < minPrice){
	    				minPrice = parseInt(child.price);
	    			}
	    		});

	    		setFetched(true);
	    		setPrice(minPrice);
	    		setLoading(false);
	    	});
		}
	})

	return (
		<div className={"plantlane-product-card" + (props.className ? " " + props.className : "")}>
			{props.badge && <div className="plantlane-badge">{props.badge}</div>}
			<Link to={props.link} className="plantlane-product-tumb">
				<img src={props.image} alt={props.name} />
			</Link>
			<div className="plantlane-product-details">
				{props.category && <span className="plantlane-product-catagory">{props.category}</span>}
				<h4><Link className="plantlane-hide-overflow" to={props.link}>{props.name}</Link></h4>
				<p className="plantlane-hide-overflow">{props.text ? stripHtml(props.text.value).replace('<p>', '').replace('</p>', '') : '.'}</p>
				<div className="plantlane-product-bottom-details">
					{!isLoading ? <div className="plantlane-product-price">{props.newPrice && <small>&#8377; {parseInt(oldPrice)}</small>}&#8377; {props.newPrice ? parseInt(props.newPrice.value) : parseInt(oldPrice)}</div> : 'Loading ...'}
					<div className="plantlane-product-links">
						<div onClick={props.addToWishList}><i className="fa fa-heart"></i></div>
						{props.typeId === 'configurable' ? <Link to={props.link}><i className="fa fa-shopping-cart"></i></Link> : <div onClick={props.addToCart}><i className="fa fa-shopping-cart"></i></div>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default card;