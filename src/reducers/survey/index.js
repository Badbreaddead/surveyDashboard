import {
	GET_SURVEYS,
	CHOOSE_SURVEY,
	SAVE_SURVEY,
	DELETE_SURVEY,
	CHANGE_SURVEY_STATUS,
    ADD_SURVEY
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
			const currentSurvey = action.payload.data[0] || '';
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
			let index;

			surveys.forEach((survey, i) => {
				if (survey.id === action.payload.id) {
					index = i;
				}
			});

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
		case `${CHANGE_SURVEY_STATUS}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${CHANGE_SURVEY_STATUS}_FULFILLED`: {
			let surveys = [...state.surveys];
			let currentSurvey = Object.assign({}, state.currentSurvey);
			let index;

			surveys.forEach((survey, i) => {
				if (survey.id === action.payload.id) {
					index = i;
				}
			});
			surveys[index].isActive = action.payload.isActive;
			currentSurvey.isActive = action.payload.isActive;

			return Object.assign({}, state, {
				isFetching: false,
				currentSurvey,
				surveys,
			});
		}
		case `${CHANGE_SURVEY_STATUS}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
        
        case `${ADD_SURVEY}_PENDING`: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case `${ADD_SURVEY}_FULFILLED`: {
            const currentSurvey = action.payload;
            const surveys = [...state.surveys];
            
            surveys.push(currentSurvey);
	        const questions = [];

            return Object.assign({}, state, {
                isFetching: false,
                currentSurvey,
                surveys,
	            questions
            });
        }
        case `${ADD_SURVEY}_REJECTED`: {
            return Object.assign({}, state, {
                isFetching: false,
            });
        }
		default:
			return state;
	}
}

export default surveyReducer;