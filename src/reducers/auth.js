import * as types from '../actions/types/auth';

const initialState = {
	isLoggedIn:false,
	user:{},
	redirectToReferrer:false,
};

const reducer = (state = initialState, action = {}) => {
	switch(action.type){
		case types.LOGGED_IN:
			return {...state, isLoggedIn:true, redirectToReferrer:true, user:action.user};
		case types.LOGGED_OUT:
			return {...state, isLoggedIn:false, redirectToReferrer:false, user:{}};
		case types.UPDATE_USER:
			return {...state, user:{...state.user, redirectToReferrer:true, ...action.user}};
		default: return state;
	}
}


export default reducer;