import React from 'react';

import './CartItemList.css';

// component imports
import CartItem from './items/CartItem';


const cartItemList = (props) => {

	return (
		<div className="tab-pane plantlane-cart-item-list fade show active" id="my-cart" role="tabpanel" aria-labelledby="my-cart-tab">
			{
				props.items.map(item => 
					<CartItem 
						key={'CART_' + item.name + item.id}
						removeItem={props.removeItemFromCart}
						changeItemQty={props.changeItemQty}
						itemImage={item.image} 
						productId={item.id}
						itemText={item.name} 
						customAttributes={item.metadata.custom_attributes}
						moveToWishlist={() => props.addToWishList(item)}
						retailPrice={item.oldPrice} 
						offerPrice={item.newPrice} 
						count={item.qty} />
				)
			}
			{
				props.items.length <= 0 && <p className="text-dark py-4 px-2">Cart Empty, Try adding some products to your cart.</p>
			}
		</div>
	);
}

export default cartItemList;