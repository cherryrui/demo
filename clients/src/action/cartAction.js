/**
 * Created by WF on 2017/9/4.
 */
import axios from 'axios';

/***
 * 获取所有购物车商品
 */
const getShoppingCart = param => dispatch => {
    return dispatch({
        type: "GET_SHOPPING_CART",
        payload: axios.get(`/cart/get-shopping-cart.json`)
    });

};
const addCart = param => dispatch => {
    return dispatch({
        type: "ADD_CART",
        payload: axios.post('/cart/add-cart.json', param)
    })
}
const deleteCart = param => dispatch => {
    return dispatch({
        type: "DELETE_CART",
        payload: axios.post('/cart/delete-cart.json', param)
    })
}
const commitOrder = param => dispatch => {
    return dispatch({
        type: "COMMIT_CART",
        payload: axios.post('/order/commit-order.json', param)
    })
}
export default {
    getShoppingCart,
    addCart,
    deleteCart,
    commitOrder
}