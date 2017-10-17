import { TOGGLE_DATEPICKER, SELECT_DATE } from 'store/actions';
import { datesState } from 'state';

export function selectDateReducer(state, date) {
	return { ...state, date};
}

export function toggleDatepickerReducer(state, isActive) {
	return { ...state, isActive };
}

function datesReducer(state, { type, payload }) {
	switch (type) {
		case TOGGLE_DATEPICKER:
			return toggleDatepickerReducer(state, payload.isActive);

		case SELECT_DATE:
			return selectDateReducer(state, payload.date);
	}

	return state;
}

export default function(state = datesState, action) {
	if (action.dateType) {
		return {
			...state,
			[action.dateType]: datesReducer(state[action.dateType], action)
		};
	}

	return state;
}