import { SET_CLASS_TYPE, TOGGLE_VICINITY_DATES, TOGGLE_DIRECT_FLIGHT } from 'store/actions';

export function setClassType (classType) {
	return {
		type: SET_CLASS_TYPE,
		value: classType
	}
}

export function vicinityDatesAction () {
	return {
		type: TOGGLE_VICINITY_DATES
	}
}

export function directFlightAction () {
	return {
		type: TOGGLE_DIRECT_FLIGHT
	}
}