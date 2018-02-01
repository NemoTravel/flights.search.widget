import {
	SET_CLASS_TYPE,
	TOGGLE_VICINITY_DATES,
	TOGGLE_DIRECT_FLIGHT,
	SET_VICINITY_DATES,
	SET_DIRECT_FLIGHT
} from '../../actions';
import { AdditionalState, additionalState } from '../../../state';
import { AnyAction } from 'redux';

export default (state: AdditionalState = additionalState, action: AnyAction): AdditionalState => {
	if (action.type === SET_CLASS_TYPE) {
		return {
			...state,
			classType: action.payload
		};
	}

	if (action.type === TOGGLE_VICINITY_DATES) {
		return {
			...state,
			vicinityDates: !state.vicinityDates
		};
	}

	if (action.type === TOGGLE_DIRECT_FLIGHT) {
		return {
			...state,
			directFlight: !state.directFlight
		};
	}

	if (action.type === SET_VICINITY_DATES) {
		return {
			...state,
			vicinityDates: action.payload
		};
	}

	if (action.type === SET_DIRECT_FLIGHT) {
		return {
			...state,
			directFlight: action.payload
		};
	}

	return state;
};
