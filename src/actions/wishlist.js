import * as types from './types/wishlist';

export const addToWishList = (product) => {
	return {
		type:types.ADD_TO_CART_WISHLIST,
		product
	};
}

export const removeFromWishList = (productId) => {
	return {
		type:types.REMOVE_FROM_CART_WISHLIST,
		productId
	};
}

export const changeQtyWishList = (productId, ops) => {
	return {
		type:types.CHANGE_QTY_WISHLIST,
		payload:{
			productId,
			ops
		}
	};
}

export const hydrateWishList = (wishList) => {
	return {
		type:types.HYDRATE_CART_WISHLIST,
		wishList
	};
}

export const resetWishList = () => {
	return {
		type:types.RESET_CART_WISHLIST
	};
}