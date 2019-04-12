import * as types from './types/nav';


export const setLogin = (show) => {
	return {
		type:types.SET_AUTH_MODAL,
		payload:{
			show,
			mode:'login'
		}
	};
}

export const setSignup = (show) => {
	return {
		type:types.SET_AUTH_MODAL,
		payload:{
			show,
			mode:'signup'
		}
	};
}

export const closeAuth = () => {
	return {
		type:types.SET_AUTH_MODAL,
		payload:{
			show:false,
			mode:''
		}
	};
}

export const setNav = (active) => {
	return {
		type:types.SET_NAV,
		active
	};
}

export const toggleCart = () => {
	return {
		type:types.SET_CART_MODAL
	};
}