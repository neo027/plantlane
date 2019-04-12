import React from 'react';

import IconButton from '../../buttons/IconButton';

import './CartItem.css';


const cartItem = (props) => {

	let showControls = true;

	if(props.customAttributes){
		let fgProduct = props.customAttributes.find(attr => attr.attribute_code === 'free_gift_product');
		showControls = (fgProduct && fgProduct.value === "1") ? false : true;
	}

	return (
		<div className="plantlane-cart-items">
			<div className="plantlane-cart-items-image"><img src={props.itemImage} alt={props.itemText}/></div>
			<div className="plantlane-cart-items-details align-top">
				<h6>{props.itemText}</h6>
				{props.offerPrice && <strike className="plantlane-cart-items-details-price">Retail Price &#8377;{props.retailPrice}</strike>}
				<div className="plantlane-cart-items-details-price">{props.offerPrice ? 'Offer Price' : 'Retail Price' }&nbsp;<span className="plantlane-text-secondry">&#8377;{props.offerPrice ? props.offerPrice : props.retailPrice}</span></div>
				{
					showControls ?
						<div className="plantlane-cart-items-details-controls mt-sm-3">
							<IconButton onClick={() => props.changeItemQty(props.productId, 'add')} animate className="mr-1">+</IconButton>
								<span className="plantlane-text-secondry plantlane-cart-count-control">{props.count}</span>
							<IconButton onClick={() => props.changeItemQty(props.productId, 'remove')} animate className="ml-1">-</IconButton>

							{props.moveToWishlist && <IconButton onClick={props.moveToWishlist} animate className="ml-md-4 ml-sm-1"><span className="plantlane-control-btn-text">Move To Wishlist</span></IconButton>}
							<IconButton onClick={() => props.removeItem(props.productId)} animate className="ml-md-2 ml-sm-1"><span className="plantlane-control-btn-text">Remove</span></IconButton>
						</div>
					:
					<div className="text-success">FREE GIFT</div>
				}
			</div>
			<hr className={props.hrClass}/>
		</div>
	);
}

export default cartItem;