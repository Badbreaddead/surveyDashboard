import {
	LOGIN,
	GET_USER,
	LOGOUT,
} from '../../actions/user';

const initialState = {

};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case `${LOGIN}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${LOGIN}_FULFILLED`: {
			return Object.assign({}, state, {
				user: action.payload,
			});
		}
		case `${LOGIN}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${GET_USER}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${GET_USER}_FULFILLED`: {
			return Object.assign({}, state, {
				user: action.payload,
			});
		}
		case `${GET_USER}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		case `${LOGOUT}_PENDING`: {
			return Object.assign({}, state, {
				isFetching: true
			});
		}
		case `${LOGOUT}_FULFILLED`: {
			return Object.assign({}, state, {
				user: '',
			});
		}
		case `${LOGOUT}_REJECTED`: {
			return Object.assign({}, state, {
				isFetching: false,
			});
		}
		default:
			return state;
	}
}

export default userReducer;