/**
 * Created by WF on 2017/9/4.
 */
let initialState = {
	result: [],
};

export default (state = initialState, action) => {
	console.log(state, action);
	switch (action.type) {
		case 'GET_ORDER_STATUS_NUM_FULFILLED':
			return action.payload.data;
		default:
			return state;
	}
};