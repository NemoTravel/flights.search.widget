import { SELECT_DATE, TOGGLE_DATEPICKER } from 'actions';

export function selectDate(date, objectType) {
	return {
		type: SELECT_DATE,
		objectType,
		payload: {
			date
		}
	};
}

export function toggleDatePicker(isActive, objectType) {
	return {
		type: TOGGLE_DATEPICKER,
		objectType,
		payload: {
			objectType,
			isActive
		}
	};
}