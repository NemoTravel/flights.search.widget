import { SELECT_DATE, TOGGLE_DATEPICKER } from 'actions';
import { DEPARTURE_DATE_TYPE, RETURN_DATE_TYPE } from 'reducers/form/dates';

function getDateByType(state, dateType) {
	return state.form.dates[dateType].date;
}

/**
 * Some wrapper for `SELECT_DATE` action.
 * 
 * @param {Moment|null} date
 * @param {String} dateType
 * @returns {Function}
 */
export function datepickerChange(date, dateType) {
	return (dispatch, getState) => {
		const state = getState();
		
		// If the new departure date is `bigger` than the selected return date,
		// clear the return date.
		if (dateType === DEPARTURE_DATE_TYPE) {
			let anotherDate = getDateByType(state, RETURN_DATE_TYPE);
			
			if (anotherDate && anotherDate.isBefore(date)) {
				dispatch(selectDate(null, RETURN_DATE_TYPE));
			}
		}
		// Do the same thing if the selected departure date is `smaller` than the new return date.
		else if (dateType === RETURN_DATE_TYPE) {
			let anotherDate = getDateByType(state, DEPARTURE_DATE_TYPE);

			if (anotherDate && anotherDate.isAfter(date)) {
				dispatch(selectDate(null, DEPARTURE_DATE_TYPE));
			}
		}

		// Update new date.
		dispatch(selectDate(date, dateType));
	};
}

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