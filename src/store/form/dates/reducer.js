import { TOGGLE_DATEPICKER, SELECT_DATE, SET_AVAILABLE_DATES } from 'store/actions';
import { datesState } from 'state';

export const selectDateReducer = (state, date) => {
	return { ...state, date};
};

export const toggleDatepickerReducer = (state, isActive) => {
	return { ...state, isActive };
};

export const setAvailableDatesReducer = (state, availableDates) => {
	return { ...state, availableDates };
};

const datesReducer = (state, { type, payload }) => {
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

export default (state = datesState, action = {}) => {
	if (action.dateType) {
		return {
			...state,
			[action.dateType]: datesReducer(state[action.dateType], action)
		};
	}

	return state;
};