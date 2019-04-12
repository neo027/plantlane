import axios from '../config/axios/admin';
import * as types from '../actions/types/categories';
import {getCategories, saveCategories, getCategory, saveCategory, getRegionList, saveRegionList} from '../utilities/categories';


const saveCategoriesAction = (categories) => {
	return {
		type:types.SET_CATEGORIES,
		categories
	}
}

export const fetchCategories = () => (dispatch) => {
	let categories = getCategories();

	if(!categories){
		return axios.get('/categories')
		.then(response => {
			saveCategories(response.data.children_data);
			dispatch(saveCategoriesAction(response.data.children_data));
		});
	}
	else {
		dispatch(saveCategoriesAction(categories));
	}
}

export const fetchCategoryDetail = async (catId) => {
	let category = getCategory(catId);

	if(!category){
		let response = await axios.get('/categories/' + catId);
		saveCategory(response.data);
		return response.data;
	}
	else {
		return category;
	}
	
}

export const fetchRegionList = async () => {
	let regionList = getRegionList();

	if(!regionList){
		return axios.get('/directory/countries/IN')
		.then(response => {
			saveRegionList(response.data.available_regions);
			return response.data.available_regions;
		});
	}
	else {
		return regionList
	}
}