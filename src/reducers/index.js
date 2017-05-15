import {combineReducers} from "redux";
import questionReducer from "./question";
import surveyReducer from "./survey";

const rootReducer = combineReducers({
	question: questionReducer,
	survey: surveyReducer,
});

export default rootReducer;
