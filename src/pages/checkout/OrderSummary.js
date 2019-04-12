import React, {Component} from 'react';

import config from '../../config/config';

import CartItem from '../../components/cart/items/CartItem';
import FreeGiftCard from '../../components/cards/freegift/Card';

class OrderSummary extends Component {

	render(){
		if(!this.props.show){
			return null;
		}
		
		return (
			<React.Fragment>
				<h6 className="text-secondary mb-4">ORDER SUMMARY</h6>
				{
					this.props.cartItems.map(item => 
						<CartItem 
							hrClass="hrClass"
							key={'CART_' + item.name + item.id}
							removeItem={this.props.removeItemFromCart}
							changeItemQty={this.props.changeItemQty}
							itemImage={item.image} 
							productId={item.id}
							itemText={item.name} 
							retailPrice={item.oldPrice} 
							customAttributes={item.metadata.custom_attributes}
							offerPrice={item.newPrice} 
							count={item.qty} />
					)
				}
				{
					this.props.cartItems.length <= 0 && <p className="text-dark py-4 px-2">Cart Empty, Try adding some products to your cart.</p>
				}

				{
					Array.isArray(this.props.availableFreeGiftOptions) && this.props.availableFreeGiftOptions.length > 0 &&
						<div>
							<h6 className="text-secondary mb-2">FREE GIFTS</h6>
							{
								this.props.availableFreeGiftOptions.map(freeGift => 
									<div key={JSON.stringify(freeGift)} className="freeGift">
										<div>
											Choose any one of below free gifts
											<div><small className="text-success">this gift is available because you purchased <b className="">{freeGift.freeGiftForName}</b></small></div>
										</div>
										{
											freeGift.products && freeGift.products.map(gift => 
												<FreeGiftCard
													name={gift.name} 
													key={gift.name + gift.id}
													id={gift.id} 
													sku={gift.sku} 
													handleClaimGift={() => this.props.handleClaimGift(gift, freeGift.freeGiftFor)}
													link={`/product/${gift.custom_attributes.find(attr => attr.attribute_code === 'url_key').value}?sku=${gift.sku}`}
													text={gift.custom_attributes.find(attr => attr.attribute_code === 'description')} 
													image={config.mediaBaseURL + 'product/' + gift.custom_attributes.find(attr => attr.attribute_code === 'image').value} />
											)
										}
									</div>
								)
							}
						</div>
				}
			</React.Fragment>
		);
	}
}

export default OrderSummary;