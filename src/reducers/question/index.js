import {
	GET_QUESTIONS,
	DELETE_QUESTION,
	UPDATE_QUESTION,
	SAVE_QUESTION,
	ADD_QUESTION,
} from '../../actions/question';

const initialState = {
	isFetching: false,
	questions: [],
	initQuestions: [],
};

function questionReducer(state = initialState, action) {
	switch (action.type) {
		case `${GET_QUESTIONS}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true,
			});
		}
		case `${GET_QUESTIONS}_FULFILLED`: {
			return Object.assign({}, state, {
				isFetching: false,
				questions: action.payload.data,
				initQuestions: action.payload.data,
			});
		}
		case `${GET_QUESTIONS}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${DELETE_QUESTION}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true,
			});
		}
		case `${DELETE_QUESTION}_FULFILLED`: {
			const questions = [...state.questions];
			let index;

			questions.forEach((question, i) => {
				if (question.id === action.payload.id) {
					index = i;
				}
			});
			questions.splice(index, 1);

			return Object.assign({}, state, {
				isFetching: false,
				questions,
			});
		}
		case `${DELETE_QUESTION}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${UPDATE_QUESTION}`: {
			const initQuestions = [...state.initQuestions];

			let index;
			initQuestions.forEach((question, i) => {
				if (question.id === action.payload.id) {
					index = i;
				}
			});
			initQuestions[index] = action.payload;

			return Object.assign({}, state, {
				initQuestions,
			});
		}
		case `${SAVE_QUESTION}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${SAVE_QUESTION}_FULFILLED`: {
			const questions = [...state.questions];
			let index;

			questions.forEach((question, i) => {
				if (question.id === action.payload.id) {
					index = i;
				}
			});
			questions[index] = action.payload;

			return Object.assign({}, state, {
				isFetching: false,
				questions,
			});
		}
		case `${SAVE_QUESTION}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${ADD_QUESTION}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${ADD_QUESTION}_FULFILLED`: {
			const questions = [...state.questions];

			questions.push(action.payload);
debugger
			return Object.assign({}, state, {
				isFetching: false,
				questions,
			});
		}
		case `${ADD_QUESTION}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		default:
			return state;
	}
}

export default questionReducer;