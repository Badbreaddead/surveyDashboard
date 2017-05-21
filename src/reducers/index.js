import {combineReducers} from "redux";
import questionReducer from "./question";
import surveyReducer from "./survey";
import userReducer from "./user";

const rootReducer = combineReducers({
	question: questionReducer,
	survey: surveyReducer,
	user: userReducer,
});

export default rootReducer;
