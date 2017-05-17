import fetch from 'isomorphic-fetch';

import config from '../../config';
import {getHeaders, getParams} from '../utils';
import {openNotification} from '../notification';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const CANCEL_UPDATE_QUESTION = 'CANCEL_UPDATE_QUESTION';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const SORT_QUESTIONS = 'SORT_QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_FORM = 'ADD_QUESTION_FORM';
export const REMOVE_QUESTIONS = 'REMOVE_QUESTIONS';
export const UPDATE_INIT_QUESTIONS = 'UPDATE_INIT_QUESTIONS';

export default class QuestionActions {

	getQuestions = (survey) => {
		let isError = false;

		return dispatch => {
			dispatch({type: `${GET_QUESTIONS}_PENDING`});
			fetch(`${config.baseUrl}questions`,
				{ method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify(survey)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${GET_QUESTIONS}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${GET_QUESTIONS}_FULFILLED`, payload: json});
					} else {
						openNotification('error', json);
					}
				})
				.catch(e => {
					dispatch({type: `${GET_QUESTIONS}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};
    
	deleteQuestion = (id, order) => {
		let isError = false;

		return dispatch => {
			dispatch({type: `${DELETE_QUESTION}_PENDING`});
			fetch(`${config.baseUrl}questions/remove`,
				{ method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify(id)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${DELETE_QUESTION}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${DELETE_QUESTION}_FULFILLED`, payload: id});
						dispatch(this.changeOrder(order, false));
						openNotification('success', json.msg);
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${DELETE_QUESTION}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};

	updateQuestion = (data) => {
		return {
			type: `${UPDATE_QUESTION}`,
			payload: data,
		}
	};

	saveQuestion = (changingQuestion, callback) => {
		let isError = false;

		return dispatch => {
			dispatch({type: `${SAVE_QUESTION}_PENDING`});
			fetch(`${config.baseUrl}questions/update`,
				{ method: 'PUT',
					headers: getHeaders(),
					body: JSON.stringify(changingQuestion)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${SAVE_QUESTION}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${SAVE_QUESTION}_FULFILLED`, payload: changingQuestion});
						openNotification('success', json.msg);
						if (callback) callback();
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${SAVE_QUESTION}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};

	addQuestion = (newQuestion, order, callback) => {
		let isError = false;

		return dispatch => {
			dispatch({type: `${ADD_QUESTION}_PENDING`});
			fetch(`${config.baseUrl}questions/create`,
				{ method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify(newQuestion)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${ADD_QUESTION}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
                        newQuestion.id = json.id;
						newQuestion.isNew = false;
						let index;
						order.forEach((q, i) => {
							if (q.id === 1 || q.id === 2) {
								index = i;
							}
						});
						order[index].id = json.id;
						dispatch(this.changeOrder(order, false));
						dispatch({type: `${ADD_QUESTION}_FULFILLED`, payload: newQuestion});
						openNotification('success', "Question added");
						if (callback) callback();
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${ADD_QUESTION}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};
	
	changeOrder = (order, isNotify) => {
        let isError = false;
        return dispatch => {
            dispatch({type: `${UPDATE_ORDER}_PENDING`});
            fetch(`${config.baseUrl}questions/order`,
                {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify(order)
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: `${UPDATE_ORDER}_REJECTED`});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: `${UPDATE_ORDER}_FULFILLED`, payload: order});
	                    dispatch(this.sortQuestions());
	                    if (isNotify)
                        openNotification('success', json.msg);
                    } else {
                        openNotification('error', json.err);
                    }
                })
                .catch(e => {
                    dispatch({type: `${UPDATE_ORDER}_REJECTED`});
                    openNotification('error', e.message);
                });
        }
	};
	
	addQuestionForm = (data) => {

		return {
			type: `${ADD_QUESTION_FORM}`,
			payload: data,
		}
	};

	cancelUpdateQuestion = (data) => {
		return {
			type: `${CANCEL_UPDATE_QUESTION}`,
			payload: data,
		}
	};

	sortQuestions = () => {
		return {
			type: `${SORT_QUESTIONS}`,
		}
	};
}
