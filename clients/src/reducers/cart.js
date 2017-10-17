/**
 * Created by WF on 2017/9/4.
 */
// User reducers @wudy
//import {
//    clone
//    } from 'ramda';
let initialState = {
    carts: [],
    sum: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SHOPPING_CART_FULFILLED':
        return action.payload.data;
        case 'ADD_CART_FULFILLED':
            return action.payload.data;
        case 'DELETE_CART_FULFILLED':
            return action.payload.data;
        case 'COMMIT_CART_FULFILLED':
            return action.payload.data;
        default:
            return state;
    }
};