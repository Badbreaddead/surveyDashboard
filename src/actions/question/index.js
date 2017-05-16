import fetch from 'isomorphic-fetch';

import config from '../../config';
import {getHeaders, getParams} from '../utils';
import {openNotification} from '../notification';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_FIRST_QUESTION = 'ADD_FIRST_QUESTION';
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

	deleteQuestion = (id) => {
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

	addQuestion = (newQuestion, callback) => {
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
						dispatch({type: `${ADD_QUESTION}_FULFILLED`, payload: newQuestion});
						openNotification('success', json.msg);
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

	addFirstQuestion = (data) => {
		return {
			type: `${ADD_FIRST_QUESTION}`,
			payload: data,
		}
	};
}
