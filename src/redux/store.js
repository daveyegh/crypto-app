import {createStore, applyMiddleware, compose} from "redux";

import mainReducer from "./reducers/mainReducer";
import thunk from "redux-thunk";

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middlewareEnhancer  = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancer, reduxDevTools)


const store = createStore(mainReducer, composedEnhancers)

export default store;