import {
	GET_QUESTIONS,
	DELETE_QUESTION,
	UPDATE_QUESTION,
    UPDATE_ORDER,
	SAVE_QUESTION,
	ADD_QUESTION,
    ADD_QUESTION_FORM,
	REMOVE_QUESTIONS,
	CANCEL_UPDATE_QUESTION,
	SORT_QUESTIONS,
} from '../../actions/question';

const initialState = {
	isFetching: false,
	isAddingQuestion: false,
	questions: [],
	order: [],
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
			const order = action.payload.data.map((question, key) => ({id: question.id, index: question.index || key}));
            
			return Object.assign({}, state, {
				isFetching: false,
                order,
				questions: action.payload.data,
				initQuestions: action.payload.data
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
				initQuestions: questions
			});
		}
		case `${DELETE_QUESTION}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${UPDATE_QUESTION}`: {
			const questions = [...state.questions];

			let index;
            questions.forEach((question, i) => {
				if (question.id === action.payload.id) {
					index = i;
				}
			});
            questions[index] = action.payload;

			return Object.assign({}, state, {
                questions
			});
		}
		case `${CANCEL_UPDATE_QUESTION}`: {
			let questions = [...state.questions];
			const initQuestions = [...state.initQuestions];
			if (action.payload.isNew) {
				if (action.payload.index === 1) {
					questions = [];
				} else {
					const removed = questions.splice(action.payload.index - 1, questions.length);
					removed.shift();
					removed.forEach(a => a.index--);
					questions = questions.concat(removed);
				}
			} else {
				let index;
				questions.forEach((question, i) => {
					if (question.id === action.payload.id) {
						index = i;
					}
				});
				questions[index] = initQuestions[index];
			}

			return Object.assign({}, state, {
				questions,
				isAddingQuestion: false,
			});
		}
		case `${REMOVE_QUESTIONS}`: {
			const questions = [];

			return Object.assign({}, state, {
				questions,
				initQuestions: questions,
				order: [],
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
				initQuestions: questions
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

            let question = questions.find(q => q.id === 1) || questions.find(q => q.id === 2);
            question = action.payload;

			return Object.assign({}, state, {
				isFetching: false,
				isAddingQuestion: false,
				questions,
				initQuestions: questions
			});
		}
		case `${ADD_QUESTION}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${ADD_QUESTION_FORM}`: {
			let questions = [...state.questions];
			const question = action.payload;

			if (question.id === 2) {
                questions.push(question);
			} else {
                const removed = questions.splice(question.index - 1, questions.length);
                removed.forEach(a => a.index++);
                questions.push(question);
                questions = questions.concat(removed);
			}
			
			return Object.assign({}, state, {
				questions,
				isAddingQuestion: true,
			});
		}
        
        case `${UPDATE_ORDER}_PENDING`: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case `${UPDATE_ORDER}_FULFILLED`: {
        	const order = action.payload;
            const questions = [...state.questions];
            
            questions.sort((a, b) => {
            	return order.find(q => a.id === q.id).index - order.find(q => b.id === q.id).index
			});
            
            return Object.assign({}, state, {
                isFetching: false,
                questions,
                order
            });
        }
        case `${UPDATE_ORDER}_REJECTED`: {
            return Object.assign({}, state, {
                isFetching: false,
            });
        }
		case `${SORT_QUESTIONS}`: {
			let questions = [...state.questions];

			questions.forEach(q => q.index = state.order.find(item => item.id === q.id).index);

			return Object.assign({}, state, {
				questions,
				initQuestions: questions
			});
		}
		default:
			return state;
	}
}

export default questionReducer;