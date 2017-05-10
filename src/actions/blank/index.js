import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getHeaders, getParams} from '../utils';
import {openNotification} from '../notification';
import { browserHistory } from 'react-router';

export const GET_TICKET_COUNT_PENDING = 'GET_TICKET_COUNT_PENDING';
export const GET_TICKET_COUNT_FULFILLED = 'GET_TICKET_COUNT_FULFILLED';
export const GET_TICKET_COUNT_REJECTED = 'GET_TICKET_COUNT_REJECTED';

export const GET_BATCH_PENDING = 'GET_BATCH_PENDING';
export const GET_BATCH_FULFILLED = 'GET_BATCH_FULFILLED';
export const GET_BATCH_REJECTED = 'GET_BATCH_REJECTED';

export const GET_TICKETS_COUNT = 'GET_TICKETS_COUNT';

export default class BlankActions {

    getTicketCount = (data, callback) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_TICKET_COUNT_PENDING, payload: data});
            fetch(`${config.baseUrl}organizers/${data.inn}/calculate_ticket_count`,
                { method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_TICKET_COUNT_REJECTED});
                    }
                    return response.json();
                })
                .catch(e => {
                    dispatch({type: GET_TICKET_COUNT_REJECTED});
                    openNotification('error', e);
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: GET_TICKET_COUNT_FULFILLED, payload: json});
                        if (callback) callback();
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getBatch = (inn,batchId) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_BATCH_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/batches/${batchId}`,
                { method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_BATCH_REJECTED});
                    }
                    if (response.status == 404) {
                        browserHistory.push(`*`);
                        openNotification('error', `Пакет ${batchId} не найден!`);
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                    const promiseList = json.map(ticketId => dispatch(this.getTicketPromise(inn, ticketId)));
                        Promise.all(promiseList)
                            .then(result => {
                                const tickets = result.map(r => r.payload);
                                dispatch({type: GET_BATCH_FULFILLED, payload: tickets})
                            })
                            .catch(error => {
                                openNotification('error', error);
                            })
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };
}
