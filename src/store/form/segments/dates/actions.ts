import { Moment } from 'moment';
import { SELECT_DATE, TOGGLE_DATEPICKER, SET_AVAILABLE_DATES } from '../../../actions';
import { ApplicationState, CommonThunkAction, DatepickerFieldType } from '../../../../state';
import { AvailableDateResponse } from '../../../../services/responses/AvailableDates';
import { isRT } from '../../selectors';

export interface DatepickerAction {
	type: string;
	dateType?: DatepickerFieldType;
	payload?: any;
	segmentId?: number;
}

const getDate = (state: ApplicationState, segmentId: number = 0): Moment => state.form.segments[segmentId].departureDate.date;

export const selectDate = (date: Moment, segmentId: number = 0): DatepickerAction => {
	return {
		type: SELECT_DATE,
		segmentId,
		payload: {
			date
		}
	};
};

export const toggleDatePicker = (isActive: boolean, dateType: DatepickerFieldType): DatepickerAction => {
	return {
		type: TOGGLE_DATEPICKER,
		dateType,
		payload: {
			isActive
		}
	};
};

export const setAvailableDates = (availableDates: AvailableDateResponse[], dateType: DatepickerFieldType): DatepickerAction => {
	return {
		type: SET_AVAILABLE_DATES,
		dateType,
		payload: {
			availableDates
		}
	};
};

/**
 * Some wrapper for `SELECT_DATE` action.
 *
 * @param {Moment|null} date
 * @param {Number} segmentId
 * @returns {Function}
 */
export const datepickerChange = (date: Moment, segmentId: number): CommonThunkAction => {
	return (dispatch, getState): void => {
		const state = getState();

		if (isRT(state)) {
			// If new departure date goes after the selected return date,
			// update return date with that new departure date.
			if (segmentId === 0) {
				const anotherDate = getDate(state, 1);

				if (anotherDate && anotherDate.isBefore(date)) {
					dispatch(selectDate(date, 1));
				}
			}
			// Do the same thing if the selected departure date goes before the new return date.
			else if (segmentId === 1) {
				const anotherDate = getDate(state, 0);

				if (anotherDate && anotherDate.isAfter(date)) {
					dispatch(selectDate(date, 0));
				}
			}
		}

		// Update new date.
		dispatch(selectDate(date, segmentId));
	};
};
