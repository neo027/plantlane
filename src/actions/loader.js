import * as types from './types/loader';

export const setLoading = value => (dispatch) => dispatch({
	type:types.SET_LOADING,
	payload:value
})
