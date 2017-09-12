import { SELECT_DATE, TOGGLE_DATEPICKER } from 'actions';

export function selectDate(date, dateType) {
	return {
		type: SELECT_DATE,
		dateType,
		payload: {
			date
		}
	};
}

export function toggleDatePicker(isActive, dateType) {
	return {
		type: TOGGLE_DATEPICKER,
		dateType,
		payload: {
			isActive
		}
	};
}