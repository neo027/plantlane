import axios from '../config/axios/admin';

import {getData, saveData} from '../utilities';

export const fetchProductsByCategory = (catId, pageNo, filters) => {
	return axios.get(`/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${catId}&` + (filters ? `${filters}&` : '') + `searchCriteria[pageSize]=12&searchCriteria[currentPage]=${pageNo}`)
	.then(response => response.data);
}

export const fetchProduct = (prodSKU) => {
	return axios.get('/products/' + encodeURI(prodSKU))
	.then(response => response.data);
}

export const fetchReviews = (productId) => {
	return axios.get('/review/reviews/' + productId)
	.then(response => response.data);
}

export const fetchAttributes = async (attrCode) => {
	let key = 'ATTR_' + attrCode;
	let attributes = getData(key);

	if(attributes){
		return attributes;
	}
	else {
		let response = await axios.get(`/products/attributes/${attrCode}/options`);
		saveData(key, response.data);
		return response.data;
	}
}

export const fetchFilters = async () => {
	let key = 'FILTERS';
	let filters = getData(key);

	if(filters){
		return filters;
	}
	else {
		let response = await axios.get(`/products/attributes?searchCriteria[filterGroups][0][filters][0][field]=attribute_code&searchCriteria[filterGroups][0][filters][0][value]=color&searchCriteria[filterGroups][0][filters][1][field]=attribute_code&searchCriteria[filterGroups][0][filters][1][value]=size`);
		saveData(key, response.data.items);
		return response.data.items;
	}
}

export const fetchChildren = (prodSKU) => {
	return axios.get(`configurable-products/${prodSKU}/children`)
	.then(response => response.data);
}

export const submitReview = ({productId, rating, nickname, title, detail}) => {
	return axios.post('/review/guest/post', 
		{
		  "productId":productId,
		  "nickname":nickname,
		  "title":title,
		  "detail":detail,
		  "ratingData": [{
				"rating_id": "4",
				"ratingCode": "Rating",
				"ratingValue": rating
			}],
			"storeId": "1"
		}
	).then(response => response.data);
}