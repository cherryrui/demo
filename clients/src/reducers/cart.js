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
    console.log(33, state, action);
        switch (action.type) {
        case 'GET_SHOPPING_CART_FULFILLED':
            //console.log(33, state, action);
            return {
                carts: action.payload.data.carts,
                sum: action.payload.data.cart_num
            };
        case 'ADD_CART_FULFILLED':
            let carts = state.carts;
            carts.push(action.payload.data.cart);
            console.log(25,carts);
            return {
                carts: carts,
                sum: state.sum+1,
            }
        default:
            return state;
    }
};