export const saveCategories = (categories) => {
	sessionStorage.categories = JSON.stringify(categories);
}

export const getCategories = () => {
	let categories = sessionStorage.categories;
	if(categories)
		return JSON.parse(categories);
	else
		return null;
}

export const removeCategories = () => {
	sessionStorage.removeItem('categories');
}

export const getCategory = (catId) => {
	let category = sessionStorage.getItem('Cat_' + catId);

	if(category)
		return JSON.parse(category);
	else
		return null;
}

export const saveCategory = (category) => {
	sessionStorage.setItem('Cat_' + category.id, JSON.stringify(category));
}


export const saveRegionList = (regionList) => {
	sessionStorage.regionList = JSON.stringify(regionList);
}

export const getRegionList = () => {
	let regionList = sessionStorage.regionList;
	if(regionList)
		return JSON.parse(regionList);
	else
		return null;
}

export const removeRegionList = () => {
	sessionStorage.removeItem('regionList');
}