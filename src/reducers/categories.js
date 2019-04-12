import * as types from '../actions/types/categories';

const initialState = [];

const reducer = (state = initialState, action = {}) => {
	switch(action.type){
		case types.SET_CATEGORIES:
			return [...action.categories];
		default: return state;
	}
}


export default reducer;