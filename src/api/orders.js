import axios from '../config/axios/admin';
// import {getToken, random} from '../utilities/auth';


export const fetchOrderHistory = (customer_id) => axios.get('/orders?searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups][0][filters][0][value]=' + customer_id).then(response => response.data);
export const cancelOrder = (orderId) => axios.post(`/orders/${orderId}/cancel`).then(response => response.data);
export const cancelOrderPostProcessing = (data) => axios.post(`/orders`, data).then(response => response.data);


export const returnOrder = (data) => axios.post(`/returns`, data).then(response => response.data);

