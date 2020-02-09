import { createStore, compose /* , applyMiddleware*/ } from "redux";
// import rootReducer from "../src/reducers/rootReducer";
import rootReducer from "./reducers/rootReducer";

// const enhancerList = [];
// const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

// if (typeof devToolsExtension === "function") {
//   enhancerList.push(devToolsExtension());
// }

const composedEnhancer = compose();
// /* applyMiddleware(someReduxMiddleware, someOtherReduxMiddleware),*/ ...enhancerList

// const initStore = () => createStore(rootReducer, {}, composedEnhancer);
const initStore = () => createStore(rootReducer, {});

module.exports = {
  initStore
};
