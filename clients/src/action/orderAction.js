/**
 * Created by WF on 2017/9/4.
 */
import axios from 'axios';

/***
 * 获取所有购物车商品
 */
const getOrderNum = () => dispatch => {
	return dispatch({
		type: "GET_ORDER_STATUS_NUM",
		payload: axios.post(`/order/get-order-status-num.json`, {})
	});

};
export default {
	getOrderNum,
}