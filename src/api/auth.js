import axios from '../config/axios';
import {saveToken, getToken, random} from '../utilities/auth';

import {userLoggedIn, updateUser} from '../actions/auth';


const loginApi = (credentials) => axios.post('/integration/customer/token', credentials);

export const getMe = () => axios.get(`/customers/me?random=${random()}`, {headers:{'Authorization':`Bearer ${getToken()}`}});

export const doLogin = (credentials) => (dispatch) => {
	return loginApi(credentials)
	.then(response => {
		saveToken(response);
		return getMe()
		.then(data => dispatch(userLoggedIn(data)));
	});
}


export const doRegister = (userData) => (dispatch) => {
	return axios.post('/customers', userData)
	.then(response => {
		return loginApi({username:response.email, password:userData.password})
		.then(response => {
			saveToken(response);
			return getMe()
			.then(data => dispatch(userLoggedIn(data)));
		});
	});
}

export const updateUserData = (userData) => (dispatch) => {
	return axios.put('/customers/me', userData, {headers:{'Authorization':`Bearer ${getToken()}`}})
	.then(userUpdatedData => {
		dispatch(updateUser(userUpdatedData));
		return userUpdatedData;
	});
}