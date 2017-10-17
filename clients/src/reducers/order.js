/**
 * Created by WF on 2017/9/4.
 */
let initialState = {
	result: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ORDER_STATUS_NUM_FULFILLED':
			return action.payload.data;
		case 'COMMIT_CART_FULFILLED':
			console.log("order 13", action, state);
			return action.payload.data;
		default:
			return state;
	}
};