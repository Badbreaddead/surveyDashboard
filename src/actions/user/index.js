import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router'

import config from '../../config';
import {getHeaders, getParams} from '../utils';
import {openNotification} from '../notification';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_USER = 'GET_USER';

export default class UsersActions {

	login = (user) => {
		let isError = false;
		return dispatch => {
			dispatch({type: `${LOGIN}_PENDING`});
			fetch(`${config.baseUrl}users/login`,
				{ method: 'POST',
					credentials: 'include',
					headers: getHeaders(),
					body: JSON.stringify(user)
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${LOGIN}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${LOGIN}_FULFILLED`, payload: user.email});
						browserHistory.push('/');
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${LOGIN}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};

	getUser = () => {
		let isError = false;
		return dispatch => {
			dispatch({type: `${GET_USER}_PENDING`});
			fetch(`${config.baseUrl}users/bo`,
				{ method: 'GET',
					credentials: 'include',
					headers: getHeaders(),
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						browserHistory.push('/login');
						dispatch({type: `${GET_USER}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${GET_USER}_FULFILLED`, payload: json.email});
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${GET_USER}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};

	logout = () => {
		let isError = false;
		return dispatch => {
			dispatch({type: `${LOGOUT}_PENDING`});
			fetch(`${config.baseUrl}users/logout`,
				{ method: 'GET',
					headers: getHeaders()
				})
				.then(response => {
					if (response.status >= 400) {
						isError = true;
						dispatch({type: `${LOGOUT}_REJECTED`});
					}
					return response.json();
				})
				.then(json => {
					if (!isError) {
						dispatch({type: `${LOGOUT}_FULFILLED`});
						browserHistory.push('/login');
					} else {
						openNotification('error', json.err);
					}
				})
				.catch(e => {
					dispatch({type: `${LOGOUT}_REJECTED`});
					openNotification('error', e.message);
				});
		};
	};
}
