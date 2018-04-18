import { TOGGLE_DATEPICKER, SELECT_DATE, SET_AVAILABLE_DATES } from '../../../actions';
import { DatepickerFieldType, DatepickerState, DatesState, datesState, dateState } from '../../../../state';
import { DatepickerAction } from './actions';
import { Moment } from 'moment';

export const selectDateReducer = (state: DatepickerState, date: Moment): DatepickerState => {
	return { ...state, date };
};

export const toggleDatepickerReducer = (state: DatepickerState, isActive: boolean): DatepickerState => {
	return { ...state, isActive };
};

export const setAvailableDatesReducer = (state: DatepickerState, availableDates: any): DatepickerState => {
	return { ...state, availableDates };
};

const datesReducer = (state: DatepickerState, { type, payload }: DatepickerAction): DatepickerState => {
	switch (type) {
		case TOGGLE_DATEPICKER:
			return toggleDatepickerReducer(state, payload.isActive);

		case SELECT_DATE:
			return selectDateReducer(state, payload.date);

		case SET_AVAILABLE_DATES:
			return setAvailableDatesReducer(state, payload.availableDates);
	}

	return state;
};

export const datesMainReducer = (state: DatepickerState = dateState, action: DatepickerAction): DatepickerState => {
	if (action.dateType) {
//		return {
//			...state,
//			datesReducer(state[action.dateType], action)
//		};

		return datesReducer(state, action);
	}

	return state;
};
