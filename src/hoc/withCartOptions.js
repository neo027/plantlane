import React, {Component} from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';

import config from '../config/config';

import {toggleCart, setLogin} from '../actions/nav';
import {changeQty, removeFromCart, hydrateCart, resetCart, addToCart} from '../actions/cart';

import {addToWishList, removeFromWishList, changeQtyWishList} from '../actions/wishlist';

import {addToUserCart, addToGuestCart, fetchUserQuoteId, 
	fetchGuestQuoteId, fetchUserCart, 
	removeFromUserCart, removeFromGuestCart} from '../api/cart';
import {fetchProduct} from '../api/products';

import {emptyCart, removeUserCart, removeGuestCart} from '../utilities/cart';


const withCartOptions = (WrappedComponent) => {
	
	class Cart extends Component {

		state = {
			isLoading:false
		}

		componentDidMount(){
			if(this.props.isLoggedIn){
				this.merge();
			}
		}

		componentDidUpdate(prevProps, prevState){
			if(prevProps.isLoggedIn !== this.props.isLoggedIn && this.props.isLoggedIn){
				this.merge();
			}

			if(prevProps.isLoggedIn !== this.props.isLoggedIn && !this.props.isLoggedIn){
				this.reset();
			}
		}

		merge = () => {
			this.setState({isLoading:true});
			removeGuestCart();
			fetchUserQuoteId()
			.then(quote_id => {
				return fetchUserCart()
				.then(userCart => {
					let intersection = _.intersectionWith(userCart.items, this.props.cartItems, (value, other) => value.sku === other.sku);
					let itemsToAddToUserCart = _.differenceWith(this.props.cartItems, intersection, (value, other) => value.sku === other.sku);

					return Promise.all(itemsToAddToUserCart.map(item => 
						addToUserCart({
							cart_item:{
								sku:item.sku,
								qty:item.qty,
								quote_id
							}
						})
						.then(newItem => ({..._.cloneDeep(item), item_id:newItem.item_id}))
					))
					.then(oldCart => {
						return Promise.all(userCart.items.map(item => 
							fetchProduct(item.sku).then(product => {
								let newPrice = product.custom_attributes.find(attr => attr.attribute_code === 'special_price')
								return {
									item_id:item.item_id,
									id:product.id,
									sku:product.sku,
									name:product.name,
									qty:item.qty,
									newPrice:newPrice ? newPrice.value : null,
									oldPrice:product.price,
									image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value,
									metadata:product
								}
							})
						))
						.then(newCart => {

							this.props.hydrateCart([..._.cloneDeep(newCart), ..._.cloneDeep(oldCart)]);
						})
					})
				})
			})
			.then(() => this.setState({isLoading:false}))
			.catch(error => this.setState({isLoading:false}));
		}

		reset = () => {
			removeGuestCart();
			removeUserCart();
			emptyCart();
			fetchGuestQuoteId()
			.then(() => this.props.resetCart());
		}

		handleRemoveFromCart = (productId) => {
			let itemToRemove = this.props.cartItems.find(item => item.id === productId);

			if(this.props.isLoggedIn){
				return removeFromUserCart(itemToRemove.item_id)
				.then(() => this.props.removeFromCart(productId));
			}
			else {
				return removeFromGuestCart(itemToRemove.item_id)
				.then(() => this.props.removeFromCart(productId));
			}
		}

		handleChangeQty = (productId, ops) => {
			let itemToChange = this.props.cartItems.find(item => item.id === productId);
			let newQty = ops === 'add' ? itemToChange.qty + 1 : itemToChange.qty - 1;

			let promise = null;

			if(this.props.isLoggedIn){
				promise = fetchUserQuoteId()
				.then(quote_id => {
					if(newQty > 0){
						return addToUserCart({
							cart_item:{
								item_id:itemToChange.item_id,
								sku:itemToChange.sku,
								qty:newQty,
								quote_id
							}
						})
					}
					else {
						return removeFromUserCart(itemToChange.item_id);
					}
				});
			}
			else {
				promise = fetchGuestQuoteId()
				.then(quote_id => {
					if(newQty > 0){
						return addToGuestCart({
							cart_item:{
								item_id:itemToChange.item_id,
								sku:itemToChange.sku,
								qty:newQty,
								quote_id
							}
						});
					}
					else {
						return removeFromGuestCart(itemToChange.item_id);
					}
				});
			}

			if(promise){
				promise.then(() => this.props.changeQty(productId, ops));
			}

			return promise;
		}

		handleCheckout = () => {
			if(this.props.isLoggedIn){
				if(this.props.cartItems.length > 0){
					this.props.history.push('/checkout');
					this.props.hideCart();
				}
			}
			else {
				this.props.setLogin(true);
			}
		}

		render(){
			const newProps = {
				handleCheckout:this.handleCheckout,
				changeItemQty:this.handleChangeQty,
				removeItemFromCart:this.handleRemoveFromCart,
				resetCart:this.reset,
				cartLoading:this.state.isLoading
			};

			return <WrappedComponent {...this.props} {...newProps} />
		}
	}


	const mapStateToProps = (state) => {
		return {
			show:state.nav.cart,
			cartItems:state.cart,
			wishListItems:state.wishlist,
			isLoggedIn:state.auth.isLoggedIn,
			user:state.auth.user
		}
	}

	const mapDispatchToProps = {
		hideCart:toggleCart,
		changeQty:changeQty,
		removeFromCart:removeFromCart,
		hydrateCart:hydrateCart,
		resetCart:resetCart,
		addToWishList,
		removeFromWishList,
		changeQtyWishList,
		setLogin,
		addToCart
	};

	return connect(mapStateToProps, mapDispatchToProps)(Cart);
}

export default withCartOptions;