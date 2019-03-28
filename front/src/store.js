import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const inititalState = {};

const store = createStore(
    rootReducer,
    inititalState,
    composeWithDevTools(applyMiddleware(thunk)));
export default store;