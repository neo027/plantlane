import React from 'react';

import CartItem from './items/CartItem';

import './WishList.css';

const wishList = (props) => {

	return (
		<div className="tab-pane fade plantlane-wishlist-container" id="wishlist" role="tabpanel" aria-labelledby="wishlist-tab">
			{
				props.items.map(item => 
					<CartItem 
						key={'CART_' + item.name + item.id}
						removeItem={props.removeFromWishList}
						changeItemQty={props.changeQtyWishList}
						itemImage={item.image} 
						productId={item.id}
						itemText={item.name} 
						retailPrice={item.oldPrice} 
						offerPrice={item.newPrice} 
						count={item.qty} />
				)
			}
			{
				props.items.length <= 0 && <p className="text-dark py-4 px-2">Wish list Empty, Try adding some products to your wishlist.</p>
			}
		</div>
	);
}

export default wishList;