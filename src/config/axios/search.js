import axios from 'axios';

import config from '../config';
import {removeToken} from '../../utilities/auth';
import {removeUserCart, emptyCart, removeDeliveryState} from '../../utilities/cart';

const instance = axios.create({
	baseURL:config.baseURL,
	headers:{
		'Content-Type':'application/json'
	}
});

instance.interceptors.response.use((response) => {
    return response.data;
},(error) => {
   if(error.response.status === 401){
   		removeUserCart();
   		emptyCart();
      	removeDeliveryState();
   		removeToken();
   }
   return Promise.reject(error);
});

export default instance;