import { SET_CLASS_TYPE, TOGGLE_VICINITY_DATES, TOGGLE_DIRECT_FLIGHT, SET_VICINITY_DATES, SET_DIRECT_FLIGHT } from 'store/actions';

export const setClassType = classType => {
	return {
		type: SET_CLASS_TYPE,
		value: classType
	};
};

export const vicinityDatesAction = () => {
	return {
		type: TOGGLE_VICINITY_DATES
	};
};

export const directFlightAction = () => {
	return {
		type: TOGGLE_DIRECT_FLIGHT
	};
};

export const setVicinityDatesCheckbox = checked => {
	return {
		type: SET_VICINITY_DATES,
		value: checked
	}
};

export const setDirectFlightCheckbox = checked => {
	return {
		type: SET_DIRECT_FLIGHT,
		value: checked
	}
}