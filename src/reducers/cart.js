import * as types from '../actions/types/cart';
import {saveCart} from '../utilities/cart';

const initialState = [];

const addItemToCart = (state, payload) => {
	let cart = [...state];

	let modIdx = cart.findIndex(product => product.id === payload.id);

	if(modIdx >= 0){
		cart[modIdx].qty += 1;
	}
	else {
		cart.push({qty:1, ...payload});
	}

	saveCart(cart);
	return cart;
}

const addItem = (oldCart, payload) => {
	let cart = [...oldCart];
	let modIdx = cart.findIndex(product => product.id === payload.id);

	if(modIdx >= 0){
		cart[modIdx].qty = payload.qty > 0 ? payload.qty : cart[modIdx].qty + 1;
	}
	else {
		cart.push({qty:1, ...payload});
	}

	return cart;
}

const removeItemFromCart = (state, payload) => {
	let cart = [...state];

	let remIdx = cart.findIndex(product => product.id === payload);
	cart.splice(remIdx, 1);
	
	saveCart(cart);

	return cart;
}

const changeQuantity = (state, payload) => {
	let cart = [...state];

	let modIdx = cart.findIndex(product => product.id === payload.productId);

	if(payload.ops === 'add'){
		cart[modIdx].qty += 1;
	}
	else {
		cart[modIdx].qty -= 1;
		if(cart[modIdx].qty <= 0){
			cart.splice(modIdx, 1);
		}
	}
	
	saveCart(cart);
	return cart;

}

const resetCart = () => {
	let cart = [];
	
	saveCart(cart);

	return cart;
}

const hydrateCart = (state, cart) => {
	let newCart = [...state];

	for (var i = 0; i < cart.length; i++) {
		newCart = addItem(newCart, cart[i]);
	}

	saveCart(newCart);
	return newCart;
}

const reducer = (state = initialState, action = {}) => {
	switch(action.type){
		case types.HYDRATE_CART:
			return hydrateCart(state, action.cart);
		case types.ADD_TO_CART:
			return addItemToCart(state, action.product);
		case types.REMOVE_FROM_CART:
			return removeItemFromCart(state, action.productId);
		case types.CHANGE_QTY:
			return changeQuantity(state, action.payload);
		case types.RESET_CART:
			return resetCart();
		default: return state;
	}
}


export default reducer;