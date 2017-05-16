import fetch from 'isomorphic-fetch';

import config from '../../config';
import {getHeaders, getParams} from '../utils';
import {openNotification} from '../notification';
import {
	GET_QUESTIONS,
} from '../question';

export const GET_SURVEYS = 'GET_SURVEYS';
export const CHOOSE_SURVEY = 'CHOOSE_SURVEY';
export const SAVE_SURVEY = 'SAVE_SURVEY';
export const ADD_SURVEY = 'ADD_SURVEY';
export const DELETE_SURVEY = 'DELETE_SURVEY';
export const CHANGE_SURVEY_STATUS = 'CHANGE_SURVEY_STATUS';

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
				.then(jsonSurveys => {
					if (!isError) {
						dispatch({type: `${GET_QUESTIONS}_PENDING`});
						fetch(`${config.baseUrl}questions`,
							{ method: 'POST',
								headers: getHeaders(),
								body: JSON.stringify({ survey: jsonSurveys.data[0].id })
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
									dispatch({type: `${GET_SURVEYS}_FULFILLED`, payload: jsonSurveys});
								} else {
									openNotification('error', json);
								}
							})
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

	changeSurveyStatus = (changingSurvey) => {
		let isError = false;
		return dispatch => {
			dispatch({type: `${CHANGE_SURVEY_STATUS}_PENDING`});
			fetch(`${config.baseUrl}surveys/activate`,
				{ method: 'PUT',
					headers: getHeaders(),
					body: JSON.stringify(changingSurvey)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${CHANGE_SURVEY_STATUS}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${CHANGE_SURVEY_STATUS}_FULFILLED`, payload: changingSurvey});
						openNotification('success', json.msg);
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${CHANGE_SURVEY_STATUS}_REJECTED`});
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
