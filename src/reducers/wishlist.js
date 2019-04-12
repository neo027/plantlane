import * as types from '../actions/types/wishlist';
import {saveWishList} from '../utilities/cart';

const initialState = [];

const addItemToWishList = (state, payload) => {
	let wishList = [...state];

	let modIdx = wishList.findIndex(product => product.id === payload.id);

	if(modIdx >= 0){
		wishList[modIdx].qty += 1;
	}
	else {
		wishList.push({qty:1, ...payload});
	}

	saveWishList(wishList);
	return wishList;
}

const addItem = (oldWishList, payload) => {
	let wishList = [...oldWishList];
	let modIdx = wishList.findIndex(product => product.id === payload.id);

	if(modIdx >= 0){
		wishList[modIdx].qty = payload.qty > 0 ? payload.qty : wishList[modIdx].qty + 1;
	}
	else {
		wishList.push({qty:1, ...payload});
	}

	return wishList;
}

const removeItemFromWishList = (state, payload) => {
	let wishList = [...state];

	let remIdx = wishList.findIndex(product => product.id === payload);
	wishList.splice(remIdx, 1);
	
	saveWishList(wishList);

	return wishList;
}

const changeQuantity = (state, payload) => {
	let wishList = [...state];

	let modIdx = wishList.findIndex(product => product.id === payload.productId);

	if(payload.ops === 'add'){
		wishList[modIdx].qty += 1;
	}
	else {
		wishList[modIdx].qty -= 1;
		if(wishList[modIdx].qty <= 0){
			wishList.splice(modIdx, 1);
		}
	}
	
	saveWishList(wishList);
	return wishList;

}

const resetWishList = () => {
	let wishList = [];
	
	saveWishList(wishList);

	return wishList;
}

const hydrateWishList = (state, wishList) => {
	let newWishList = [...state];

	for (var i = 0; i < wishList.length; i++) {
		newWishList = addItem(newWishList, wishList[i]);
	}

	saveWishList(newWishList);
	return newWishList;
}

const reducer = (state = initialState, action = {}) => {
	switch(action.type){
		case types.HYDRATE_CART_WISHLIST:
			return hydrateWishList(state, action.wishList);
		case types.ADD_TO_CART_WISHLIST:
			return addItemToWishList(state, action.product);
		case types.REMOVE_FROM_CART_WISHLIST:
			return removeItemFromWishList(state, action.productId);
		case types.CHANGE_QTY_WISHLIST:
			return changeQuantity(state, action.payload);
		case types.RESET_CART_WISHLIST:
			return resetWishList();
		default: return state;
	}
}


export default reducer;