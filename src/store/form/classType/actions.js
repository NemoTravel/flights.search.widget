import { SET_CLASS_TYPE, TOGGLE_VICINITY_DATES } from 'store/actions';

export function setClassType (classType) {
	return {
		type: SET_CLASS_TYPE,
		classType
	}
}

export function vicinityDatesAction () {
	return {
		type: TOGGLE_VICINITY_DATES
	}
}