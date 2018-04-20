import { Moment } from 'moment';
import { SELECT_DATE, TOGGLE_DATEPICKER, SET_AVAILABLE_DATES } from '../../../actions';
import {
	ApplicationState, CommonThunkAction, DatepickerFieldType,
	GetStateFunction
} from '../../../../state';
import { AnyAction, Dispatch } from 'redux';
import { AvailableDateResponse } from '../../../../services/responses/AvailableDates';
import { isRT } from "../../selectors";

export interface DatepickerAction {
	type: string;
	dateType?: DatepickerFieldType;
	payload?: any;
	segmentId?: number;
}

const getDate = (state: ApplicationState, segmentId: number = 0): Moment => state.form.segments[segmentId].date.date;

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
 * @param {String} dateType
 * @param {Number} segmentId
 * @returns {Function}
 */
export const datepickerChange = (date: Moment, dateType: DatepickerFieldType, segmentId: number): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const state = getState();

		if (isRT(state)) {
			// If the new departure date is `bigger` than the selected return date,
			// clear the return date.
			if (segmentId === 0) {
				const anotherDate = getDate(state, 1);

				if (anotherDate && anotherDate.isBefore(date)) {
					dispatch(selectDate(null, 1));
					dispatch(toggleDatePicker(false, DatepickerFieldType.Return));
				}
			}
			// Do the same thing if the selected departure date is `smaller` than the new return date.
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
