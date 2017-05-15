import fetch from 'isomorphic-fetch';

import config from '../../config';
import {getHeaders, getParams} from '../utils';
import {openNotification} from '../notification';

export const GET_SURVEYS = 'GET_SURVEYS';
export const CHOOSE_SURVEY = 'CHOOSE_SURVEY';
export const SAVE_SURVEY = 'SAVE_SURVEY';
export const ADD_SURVEY = 'ADD_SURVEY';
export const DELETE_SURVEY = 'DELETE_SURVEY';

export default class SurveysActions {

	getSurveys = () => {
		let isError = false;
		return dispatch => {
			dispatch({type: `${GET_SURVEYS}_PENDING`});
			fetch(`${config.baseUrl}surveys`,
				{ method: 'GET',
					headers: getHeaders(),
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${GET_SURVEYS}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${GET_SURVEYS}_FULFILLED`, payload: json});
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${GET_SURVEYS}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};

	chooseSurvey = (data) => {
		return {
			type: `${CHOOSE_SURVEY}`,
			payload: data,
		}
	};

	saveSurvey = (changedSurvey, callback) => {
		let isError = false;
		return dispatch => {
			dispatch({type: `${SAVE_SURVEY}_PENDING`});
			fetch(`${config.baseUrl}surveys/update`,
				{ method: 'PUT',
					headers: getHeaders(),
					body: JSON.stringify(changedSurvey)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${SAVE_SURVEY}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${SAVE_SURVEY}_FULFILLED`, payload: changedSurvey});
						openNotification('success', json.msg);
						if (callback) callback();
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${SAVE_SURVEY}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};

	addSurvey = (newSurvey, callback) => {
		let isError = false;
		return dispatch => {
			dispatch({type: `${ADD_SURVEY}_PENDING`});
			fetch(`${config.baseUrl}surveys/create`,
				{ method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify(newSurvey)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${ADD_SURVEY}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${ADD_SURVEY}_FULFILLED`, payload: newSurvey});
						openNotification('success', json.msg);
						if (callback) callback();
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${ADD_SURVEY}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};

	deleteSurvey = (survey, callback) => {
		let isError = false;
		return dispatch => {
			dispatch({type: `${DELETE_SURVEY}_PENDING`});
			fetch(`${config.baseUrl}surveys/remove`,
				{ method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify(survey)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${DELETE_SURVEY}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${DELETE_SURVEY}_FULFILLED`, payload: survey});
						openNotification('success', json.msg);
						if (callback) callback();
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${DELETE_SURVEY}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};
}
