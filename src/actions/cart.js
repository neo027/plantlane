import * as types from './types/cart';

export const addToCart = (product) => {
	return {
		type:types.ADD_TO_CART,
		product
	};
}

export const removeFromCart = (productId) => {
	return {
		type:types.REMOVE_FROM_CART,
		productId
	};
}

export const changeQty = (productId, ops) => {
	return {
		type:types.CHANGE_QTY,
		payload:{
			productId,
			ops
		}
	};
}

export const hydrateCart = (cart) => {
	return {
		type:types.HYDRATE_CART,
		cart
	};
}

export const resetCart = () => {
	return {
		type:types.RESET_CART
	};
}