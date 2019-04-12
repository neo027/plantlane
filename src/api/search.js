import searchAxios from '../config/axios/search';
import axios from '../config/axios/admin';

export const search = (query) => searchAxios.get('/mageworx_searchsuiteautocomplete/ajax/index/?q=' + query);
export const searchFull = (query) => axios.get(`/products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%25${query}%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like`).then(response => response.data);

