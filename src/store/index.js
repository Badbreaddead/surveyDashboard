import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import mainReducer from '../reducers/index.js';

const store = createStore(
    mainReducer,
    applyMiddleware(thunk, promiseMiddleware)
);

export default store;