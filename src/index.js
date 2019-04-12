import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';

import {Provider} from 'react-redux';
import store from './store';

import {getToken} from './utilities/auth';
import {getCart, getWishList} from './utilities/cart';

import {userLoggedIn, userLoggedOut} from './actions/auth';
import {hydrateCart} from './actions/cart';
import {hydrateWishList} from './actions/wishlist';
import {setLoading} from './actions/loader';

import {getMe} from './api/auth';

import config from './config/config';

import App from './App';

import './index.css';
import './theme.css';
import './fontawesome.css';

import * as serviceWorker from './serviceWorker';


// axios global config
axios.defaults.baseURL = config.api.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if(error.response.status === 401){
		store.dispatch(userLoggedOut());
	}

	return Promise.reject(error);
});

const token = getToken();
const cart = getCart();
const wishlist = getWishList();

if(token){
	store.dispatch(setLoading(true));
	getMe()
	.then(data => {
		store.dispatch(userLoggedIn(data));
		store.dispatch(setLoading(false));
	})
	.catch(error => store.dispatch(setLoading(false)));
}

if(cart){
	store.dispatch(hydrateCart(cart));
}

if(wishlist){
	store.dispatch(hydrateWishList(wishlist));
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
serviceWorker.register();