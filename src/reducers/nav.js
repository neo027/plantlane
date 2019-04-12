import * as types from '../actions/types/nav';

const initialState = {
	authModal:{
		mode:'login',
		show:false
	},
	cart:false,
	active:'home',
}

const setAuthModal = (state, payload) => {
	let mode = (payload.mode === 'signup' || payload.mode === 'login') ? payload.mode : 'login';
	let authModal = {...state.authModal, mode, show:payload.show};

	return authModal;
}

const reducer = (state = initialState, action = {}) => {
	switch(action.type){
		case types.SET_AUTH_MODAL:
			return {
				...state, 
				authModal:setAuthModal(state, action.payload), 
				cart:false
			};
		case types.SET_NAV:
			return {
				...state, 
				active:action.active, 
				authModal:setAuthModal(state, {show:false}), 
				cart:false
			};
		case types.SET_CART_MODAL:
			return {
				...state, 
				authModal:setAuthModal(state, {show:false}), 
				cart:!state.cart
			};
		default: return state;
	}
}


export default reducer;