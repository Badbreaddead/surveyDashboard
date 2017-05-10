import {combineReducers} from "redux";
import blankReducer from "./blank";

const rootReducer = combineReducers({
    blank: blankReducer
});

export default rootReducer;
