import { SET_CLASS_TYPE, TOGGLE_VICINITY_DATES, TOGGLE_DIRECT_FLIGHT, SET_VICINITY_DATES, SET_DIRECT_FLIGHT } from 'store/actions';
import { additionalState } from 'state';

export default function(state = additionalState, action = {}) {
	if (action.type === SET_CLASS_TYPE) {
		return {
			...state,
			'classType': action.value
		};
	}

	if (action.type === TOGGLE_VICINITY_DATES) {
		return {
			...state,
			'vicinityDates': !state.vicinityDates
		};
	}

	if (action.type === TOGGLE_DIRECT_FLIGHT) {
		return {
			...state,
			'directFlight': !state.directFlight
		};
	}

	if (action.type === SET_VICINITY_DATES) {
		return {
			...state,
			'vicinityDates': action.value
		}
	}

	if (action.type === SET_DIRECT_FLIGHT) {
		return {
			...state,
			'directFlight': action.value
		}
	}

	return state;
}
