import {
    GET_TICKET_COUNT_PENDING,
    GET_TICKET_COUNT_FULFILLED,
    GET_TICKET_COUNT_REJECTED,
    CREATE_NEW_BATCH_PENDING,
    CREATE_NEW_BATCH_FULFILLED,
    CREATE_NEW_BATCH_REJECTED,
    CREATE_NEW_CSV_PENDING,
    CREATE_NEW_CSV_FULFILLED,
    CREATE_NEW_CSV_REJECTED,
    GET_BATCH_PENDING,
    GET_BATCH_FULFILLED,
    GET_BATCH_REJECTED,
    GET_TICKET_PENDING,
    GET_TICKET_FULFILLED,
    GET_TICKET_REJECTED,
    SELL_TICKET_PENDING,
    SELL_TICKET_FULFILLED,
    SELL_TICKET_REJECTED,
    CANCEL_TICKET_PENDING,
    CANCEL_TICKET_FULFILLED,
    CANCEL_TICKET_REJECTED,
    EDIT_TICKET_PENDING,
    EDIT_TICKET_FULFILLED,
    EDIT_TICKET_REJECTED,
    HANDLE_TICKET,
    GET_ORGANIZERS_PENDING,
    GET_ORGANIZERS_FULFILLED,
    GET_ORGANIZERS_REJECTED,
    GET_TICKETS_PENDING,
    GET_TICKETS_FULFILLED,
    GET_TICKETS_REJECTED,
    GET_CSV_JOB_PENDING,
    GET_CSV_JOB_FULFILLED,
    GET_CSV_JOB_REJECTED,
    GET_STATS_PENDING,
    GET_STATS_FULFILLED,
    GET_STATS_REJECTED,
    GET_TICKETS_COUNT
} from '../../actions/blank';

const initialState = {
    isFetching: false,
    batch: [],
    organizers: [],
    tickets: [],
    ticket: {},
    csvJob: {}
};

function blankReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TICKET_COUNT_PENDING: {
            return Object.assign({}, state, {
                newBatch: action.payload,
                isFetching: true
            });
        }
        case GET_TICKET_COUNT_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                ticketCount: action.payload.count
            });
        }
        case GET_TICKET_COUNT_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }

        case CREATE_NEW_BATCH_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case CREATE_NEW_BATCH_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                batchId: action.payload.batch_id
            });
        }
        case CREATE_NEW_BATCH_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case CREATE_NEW_CSV_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case CREATE_NEW_CSV_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                batchId: action.payload.job_id
            });
        }
        case CREATE_NEW_CSV_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case GET_BATCH_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_BATCH_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                batch: action.payload
            });
        }
        case GET_BATCH_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case GET_TICKET_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_TICKET_FULFILLED: {
            const ticket = action.payload;
            let tickets = state.tickets;
            if (ticket.isSearch) {
                tickets = [ticket];
            }
            if (ticket.state === 'created') {
                delete ticket.buying_date;
            }
            return Object.assign({}, state, {
                isFetching: false,
                ticket,
                tickets
            });
        }
        case GET_TICKET_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case SELL_TICKET_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case SELL_TICKET_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case CANCEL_TICKET_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case CANCEL_TICKET_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case EDIT_TICKET_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case EDIT_TICKET_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case HANDLE_TICKET: {
            return Object.assign({}, state, {
                ticket: action.payload
            });
        }
        case GET_ORGANIZERS_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_ORGANIZERS_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                count: undefined,
                organizers: action.payload
            });
        }
        case GET_ORGANIZERS_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }

        case GET_TICKETS_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_TICKETS_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                tickets: action.payload
            });
        }
        case GET_TICKETS_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case GET_CSV_JOB_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_CSV_JOB_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                csvJob: action.payload
            });
        }
        case GET_CSV_JOB_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case GET_STATS_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_STATS_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                stats: action.payload
            });
        }
        case GET_STATS_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case `${GET_TICKETS_COUNT}_PENDING`: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case `${GET_TICKETS_COUNT}_FULFILLED`: {
            return Object.assign({}, state, {
                count: action.payload.count
            });
        }
        case `${GET_TICKETS_COUNT}_REJECTED`: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        default:
            return state;
    }
}

export default blankReducer;