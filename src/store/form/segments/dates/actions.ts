import { Moment } from 'moment';
import { SELECT_DATE, TOGGLE_DATEPICKER, SET_AVAILABLE_DATES } from '../../../actions';
import {
	ApplicationState, CommonThunkAction, DatepickerFieldType,
	GetStateFunction
} from '../../../../state';
import { AnyAction, Dispatch } from 'redux';
import { AvailableDateResponse } from '../../../../services/responses/AvailableDates';

export interface DatepickerAction {
	type: string;
	dateType: DatepickerFieldType;
	payload?: any;
	segmentId?: number;
}

const getDateByType = (state: ApplicationState, dateType: DatepickerFieldType, segmentId: number = 0): Moment => state.form.segments[segmentId].dates[dateType].date;

export const selectDate = (date: Moment, dateType: DatepickerFieldType, segmentId: number = 0): DatepickerAction => {
	return {
		type: SELECT_DATE,
		dateType,
		segmentId,
		payload: {
			date
		}
	};
};

export const toggleDatePicker = (isActive: boolean, dateType: DatepickerFieldType, segmentId: number = 0): DatepickerAction => {
	return {
		type: TOGGLE_DATEPICKER,
		dateType,
		payload: {
			isActive
		}
	};
};

export const setAvailableDates = (availableDates: AvailableDateResponse[], dateType: DatepickerFieldType, segmentId: number = 0): DatepickerAction => {
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
 * @param {String} dateType
 * @param {Number} segmentId
 * @returns {Function}
 */
export const datepickerChange = (date: Moment, dateType: DatepickerFieldType, segmentId: number): CommonThunkAction => {
	return (dispatch, getState): void => {
		const state = getState();

		// If the new departure date is `bigger` than the selected return date,
		// clear the return date.
		if (dateType === 'departure') {
			const anotherDate = getDateByType(state, DatepickerFieldType.Return, segmentId);

			if (anotherDate && anotherDate.isBefore(date)) {
				dispatch(selectDate(null, DatepickerFieldType.Return, segmentId));
				dispatch(toggleDatePicker(false, DatepickerFieldType.Return));
			}
		}

		// Do the same thing if the selected departure date is `smaller` than the new return date.
		else if (dateType === 'return') {
			const anotherDate = getDateByType(state, DatepickerFieldType.Departure, segmentId);

			if (anotherDate && anotherDate.isAfter(date)) {
				dispatch(selectDate(date, DatepickerFieldType.Departure, segmentId));
			}
		}

		// Update new date.
		dispatch(selectDate(date, dateType, segmentId));
	};
};
