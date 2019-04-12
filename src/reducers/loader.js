import * as types from '../actions/types/loader';

const initialState = {
	isLoading:false
};

const reducer = (state = initialState, action = {}) => {
	switch(action.type){
		case types.SET_LOADING:
			return {isLoading:action.payload};
		default: return state;
	}
}


export default reducer;