import {
	GET_SURVEYS,
	CHOOSE_SURVEY,
	SAVE_SURVEY,
	DELETE_SURVEY
} from '../../actions/survey';

const initialState = {
	isFetching: false,
	surveys: [],
};

function surveyReducer(state = initialState, action) {
	switch (action.type) {
		case `${GET_SURVEYS}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${GET_SURVEYS}_FULFILLED`: {
			return Object.assign({}, state, {
				isFetching: false,
				surveys: action.payload.data,
				currentSurvey: action.payload.data[0]
			});
		}
		case `${GET_SURVEYS}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${CHOOSE_SURVEY}`: {
			return Object.assign({}, state, {
				currentSurvey: action.payload,
			});
		}
		case `${SAVE_SURVEY}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${SAVE_SURVEY}_FULFILLED`: {
			const surveys = [...state.surveys];
			const index = state.surveys.indexOf(action.payload);

			surveys[index] = action.payload;

			return Object.assign({}, state, {
				isFetching: false,
				currentSurvey: action.payload,
				surveys,
			});
		}
		case `${SAVE_SURVEY}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${DELETE_SURVEY}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${DELETE_SURVEY}_FULFILLED`: {
			const index = state.surveys.indexOf(action.payload);
			const surveys = [...state.surveys];

			surveys.splice(index, 1);
			let currentSurvey;
			if (index === 0) currentSurvey = surveys[1]; else currentSurvey = surveys[0];

			return Object.assign({}, state, {
				isFetching: false,
				currentSurvey,
				surveys,
			});
		}
		case `${DELETE_SURVEY}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		default:
			return state;
	}
}

export default surveyReducer;