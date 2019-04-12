import React, {Component} from 'react';
import {connect} from 'react-redux';
// import ReactDOM from 'react-dom';
import swal from 'sweetalert';

import config from '../../config/config';

// import {fetchProductsByCategory} from '../../api/products';
import {addToUserCart, addToGuestCart, fetchUserQuoteId, fetchGuestQuoteId} from '../../api/cart';

import {addToCart} from '../../actions/cart';
import {addToWishList} from '../../actions/wishlist';

import ProductCard from '../../components/cards/product/Card';

class ProductListGeneral extends Component {

	handleAddToCart = (product) => {
		let promise = null;
		this.setState({isLoading:true});
		if(this.props.isLoggedIn){
			promise = fetchUserQuoteId()
			.then(quote_id => addToUserCart({
				cart_item:{
					sku:product.sku,
					qty:1,
					quote_id
				}
			}));
		}
		else {
			promise = fetchGuestQuoteId()
			.then(quote_id => addToGuestCart({
				cart_item:{
					sku:product.sku,
					qty:1,
					quote_id
				}
			}));
		}

		if(promise){
			let newPrice = product.custom_attributes.find(attr => attr.attribute_code === 'special_price');
			promise.then(item => {
				this.props.addToCart({
					item_id:item.item_id,
					id:product.id,
					sku:product.sku,
					name:product.name,
					qty:item.qty,
					newPrice: newPrice ? newPrice.value : null,
					oldPrice:product.price,
					image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value,
					metadata:product
				});
				this.setState({isLoading:false});
				swal('Added To Cart', `${product.name} added to cart successfully.`, 'success');
			})
		}
	}

	handleAddToWishList = (product) => {
		this.props.addToWishList({
			id:product.id,
			sku:product.sku,
			name:product.name,
			qty:1,
			newPrice:product.custom_attributes.find(attr => attr.attribute_code === 'special_price'),
			oldPrice:product.price,
			image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value
		});
		swal('Added To wishlist', `${product.name} added to wishlist successfully.`, 'success');
	}

	render(){

		return (
			<React.Fragment>
			{
				this.props.data.map(product => {
					if(!product){
						return null;
					}

					return (
						<ProductCard 
							name={product.name} 
							key={product.name + product.id}
							className={this.props.productCardClass}
							id={product.id} 
							sku={product.sku} 
							typeId={product.type_id}
							addToCart={() => this.handleAddToCart(product)}
							addToWishList={() => this.handleAddToWishList(product)}
							link={`/product/${product.custom_attributes.find(attr => attr.attribute_code === 'url_key').value}?sku=${product.sku}`}
							text={product.custom_attributes.find(attr => attr.attribute_code === 'description')} 
							newPrice={product.custom_attributes.find(attr => attr.attribute_code === 'special_price')} 
							oldPrice={product.price} 
							image={config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value} />
					);
				})
			}
			</React.Fragment>
		);
	}
}



const mapStateToProps = (state) => {
	return {
		isLoggedIn:state.auth.isLoggedIn
	}
}

const mapDispatchToProps = {
	addToCart:addToCart,
	addToWishList:addToWishList
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductListGeneral);