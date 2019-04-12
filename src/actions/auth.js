import * as types from './types/auth';

export const userLoggedIn = (user) => {
	return {
		type:types.LOGGED_IN,
		user
	};
}

export const userLoggedOut = () => {
	return {
		type:types.LOGGED_OUT
	};
}

export const updateUser = (user) => {
	return {
		type:types.UPDATE_USER,
		user
	};
}