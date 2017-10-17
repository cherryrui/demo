/**
 * Created by WF on 2017/9/4.
 */
import {
	combineReducers
} from 'redux';

import cart from './cart';
import order from './order';

export default combineReducers({
	cart,
	order
});