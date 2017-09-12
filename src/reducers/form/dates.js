import { types } from 'actions';
import { combineReducers } from 'redux';

const initialState = {
	isActive: true,
	date: null
};

function departureDateReducer(state = initialState, action) {
	return action.payload && action.payload.fieldType === 'departure' ? datesReducer(state, action) : state;
}

function returnDateReducer(state = {...initialState, isActive: false }, action) {
	return action.payload && action.payload.fieldType === 'return' ? datesReducer(state, action) : state;
}

function datesReducer(state = initialState, { type, payload }) {
	switch (type) {
		case types.TOGGLE_DATEPICKER:
			return { ...state, isActive: payload.isActive };

		case types.SELECT_DATE:
			return { ...state, date: payload.date };
	}

	return state;
}

export default combineReducers({
	departure: departureDateReducer,
	return: returnDateReducer,
});