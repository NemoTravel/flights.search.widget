import { ADD_PASSENGER, REMOVE_PASSENGER, SET_PASSENGER_COUNTER } from 'store/actions';
import { passengersState } from 'state';

export const nemoToWebskyPassTypes = {
	ADT: 'aaa',
	CLD: 'rbg',
	INF: 'rmg',
	INS: 'rvg'
};

export function setPassengersCounterReducer(state, count) {
	return { ...state, count };
}

export function passengersReducer(state, { type, payload }) {
	switch (type) {
		case ADD_PASSENGER:
			return { ...state, count: state.count + 1 };

		case REMOVE_PASSENGER:
			return { ...state, count: state.count - 1 };

		case SET_PASSENGER_COUNTER:
			return setPassengersCounterReducer(state, payload);
	}

	return state;
}

export default function(state = passengersState, action = {}) {
	if (action.passengerType) {
		return {
			...state,
			[action.passengerType]: passengersReducer(state[action.passengerType], action)
		};
	}

	return state;
}