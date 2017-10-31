import { SET_CLASS_TYPE, TOGGLE_VICINITY_DATES } from 'store/actions';
import { classType, vicinityDates } from 'state';

export default function(state = classType, action = {}) {

	if (action.classType) {
		return {
			...state,
			'classType': action.classType
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

