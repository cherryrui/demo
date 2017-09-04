/**
 * Created by WF on 2017/9/4.
 */
import axios from 'axios';

/***
 * 获取所有购物车商品
 */
const getShoppingCart = param => dispatch => {
    console.log(10,param);
    return dispatch({
        type: "GET_SHOPPING_CART",
        payload: axios.get(`/cart/get-shopping-cart.json`)
    });

};
const addCart =param=> dispatch=>{
    console.log(10,param);
    return dispatch({
        type: "ADD_CART",
        payload: axios.post('/cart/add-cart.json',param)
    })
}
export default {
    getShoppingCart,
    addCart
}