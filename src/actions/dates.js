import { types } from 'actions';

export function selectDate(date, objectType) {
	return {
		type: types.SELECT_DATE,
		payload: {
			objectType,
			date
		}
	};
}

export function toggleDatePicker(isActive, objectType) {
	return {
		type: types.TOGGLE_DATEPICKER,
		payload: {
			objectType,
			isActive
		}
	};
}