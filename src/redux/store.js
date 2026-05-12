import rootReducer from "./reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { save, load } from "redux-localstorage-simple";
import thunk from "redux-thunk";

const store = createStore(rootReducer, load(), applyMiddleware(thunk));
export default store;