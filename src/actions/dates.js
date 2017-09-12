import { types } from 'actions';

export function selectDate(date, objectType) {
	return {
		type: types.SELECT_DATE,
		objectType,
		payload: {
			date
		}
	};
}

export function toggleDatePicker(isActive, objectType) {
	return {
		type: types.TOGGLE_DATEPICKER,
		objectType,
		payload: {
			objectType,
			isActive
		}
	};
}