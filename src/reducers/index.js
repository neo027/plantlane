import {combineReducers} from 'redux';

import auth from './auth';
import nav from './nav';
import categories from './categories';
import cart from './cart';
import wishlist from './wishlist';
import loader from './loader';

export default combineReducers({
	auth,
	nav,
	categories,
	cart,
	wishlist,
	loader
});