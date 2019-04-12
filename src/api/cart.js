import axios from '../config/axios';
import {getToken, random} from '../utilities/auth';
import {saveGuestQuoteId, saveUserQuoteId, getGuestQuoteId, getUserQuoteId} from '../utilities/cart';


export const fetchUserCart = () => axios.get('/carts/mine', {headers:{'Authorization':`Bearer ${getToken()}`}});

export const fetchUserQuoteId = async () => {
	let userQuoteId = getUserQuoteId();

	if(!userQuoteId){
		let response = await axios.post('/carts/mine', {}, {headers:{'Authorization':`Bearer ${getToken()}`}})
		saveUserQuoteId(response);
		return response;
	}
	else {
		return userQuoteId;
	}
}

export const addToUserCart = (item) => axios.post('/carts/mine/items', item,  {headers:{'Authorization':`Bearer ${getToken()}`}}).then(data => {
	if(data.price === null || data.price === undefined){
		let tmpItem = {...item};
		tmpItem.cart_item.item_id = data.item_id;

		return addToUserCart(tmpItem);
	}
	else {
		return data;
	}
});

export const addToGuestCart = (item) => axios.post(`/guest-carts/${getGuestQuoteId()}/items`, item,  {headers:{'Authorization':`Bearer ${getToken()}`}});

export const removeFromUserCart = (itemId) => axios.delete(`/carts/mine/items/${itemId}`, {headers:{'Authorization':`Bearer ${getToken()}`}});

export const removeFromGuestCart = (itemId) => axios.delete(`/guest-carts/${getGuestQuoteId()}/items/${itemId}`);


export const fetchGuestQuoteId = async () => {
	let guestQuoteId = getGuestQuoteId();

	if(!guestQuoteId){
		let response = await axios.post('/guest-carts');
		saveGuestQuoteId(response);
		return response;
	}
	else {
		return guestQuoteId
	}
}

export const fetchGuestCart = () => axios.get(`/guest-carts/${getGuestQuoteId()}`);

export const fetchCartTotalAmount = () => axios.get(`/carts/mine/totals?random=${random()}`, {headers:{'Authorization':`Bearer ${getToken()}`}});

export const addCouponCodeToCart = (couponCode) => axios.put(`/carts/mine/coupons/${couponCode}`, {}, {headers:{'Authorization':`Bearer ${getToken()}`}});

export const removeCouponFromCart = () => axios.delete('/carts/mine/coupons', {headers:{'Authorization':`Bearer ${getToken()}`}});

export const estimateShippingMethods = (addressId) => axios.post('/carts/mine/estimate-shipping-methods-by-address-id', {addressId}, {headers:{'Authorization':`Bearer ${getToken()}`}});

export const setShippingInformation = (shippingInfo) => axios.post('/carts/mine/shipping-information', shippingInfo, {headers:{'Authorization':`Bearer ${getToken()}`}});

export const sendPaymentInformation = (paymentInfo) => axios.post('/carts/mine/payment-information', paymentInfo, {headers:{'Authorization':`Bearer ${getToken()}`}});

