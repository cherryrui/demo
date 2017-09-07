/**
 * Created by WF on 2017/9/4.
 */
import {
    createStore,
        applyMiddleware
} from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

// Reducers
import reducers from './reducers';

let middleware = applyMiddleware(promise(), thunk);

export default createStore(reducers, middleware);
