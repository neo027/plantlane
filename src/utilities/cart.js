export const saveCart = (cart) => {
	sessionStorage.cart = JSON.stringify(cart);
}

export const getCart = () => {
	let cart = sessionStorage.cart;
	if(cart)
		return JSON.parse(cart);
	else
		return null;
}

export const emptyCart = () => {
	sessionStorage.removeItem('cart');
}

export const saveWishList = (wishList) => {
	sessionStorage.wishList = JSON.stringify(wishList);
}

export const getWishList = () => {
	let wishList = sessionStorage.wishList;
	if(wishList)
		return JSON.parse(wishList);
	else
		return null;
}

export const emptyWishList = () => {
	sessionStorage.removeItem('wishList');
}

export const saveUserQuoteId = (userQuoteId) => {
	sessionStorage.userQuoteId = userQuoteId;
}


export const getUserQuoteId = () => {
	return sessionStorage.userQuoteId;
}

export const removeUserCart = () => {
	sessionStorage.removeItem('userQuoteId');
}

export const saveGuestQuoteId = (guestQuoteId) => {
	sessionStorage.guestQuoteId = guestQuoteId;
}


export const getGuestQuoteId = () => {
	return sessionStorage.guestQuoteId;
}

export const removeGuestCart = () => {
	sessionStorage.removeItem('guestQuoteId');
}

export const saveDeliveryState = (deliveryState) => {
	sessionStorage.deliveryState = JSON.stringify(deliveryState);
}


export const getDeliveryState = () => {
	let deliveryState = sessionStorage.deliveryState;

	if(deliveryState)
		return JSON.parse(deliveryState);
	else
		return null;
}

export const removeDeliveryState = () => {
	sessionStorage.removeItem('deliveryState');
}