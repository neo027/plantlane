import axios from 'axios';
import config from '../config';

const instance = axios.create({
	headers:{
		'Authorization':`Bearer ${config.api.accessToken}`,
		'Content-Type':'application/json'
	}
});

export default instance;