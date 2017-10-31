import { SET_CLASS_TYPE, TOGGLE_VICINITY_DATES } from 'store/actions';
import { additional } from 'state';

export default function(state = additional, action = {}) {

	if (action.type === SET_CLASS_TYPE) {
		return {
			...state,
			'classType': action.value
		}
	}

	if (action.type === TOGGLE_VICINITY_DATES) {
		return {
			...state,
			'vicinityDates': !state.vicinityDates
		}
	}

	return state;
}

