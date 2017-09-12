import { types } from 'actions';

export function selectDate(date, fieldType) {
	return {
		type: types.SELECT_DATE,
		payload: {
			fieldType,
			date
		}
	};
}

export function toggleDatePicker(isActive, fieldType) {
	return {
		type: types.TOGGLE_DATEPICKER,
		payload: {
			fieldType,
			isActive
		}
	};
}