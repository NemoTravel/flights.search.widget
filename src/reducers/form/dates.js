import { TOGGLE_DATEPICKER, SELECT_DATE } from 'actions';
import { combineReducers } from 'redux';
import { filterReducer } from 'reducers';

const initialState = {
	isActive: true,
	date: null
};

function datesReducer(state, { type, payload }) {
	switch (type) {
		case TOGGLE_DATEPICKER:
			return { ...state, isActive: payload.isActive };

		case SELECT_DATE:
			return { ...state, date: payload.date };
	}

	return state;
}

export default combineReducers({
	departure: filterReducer('departure', datesReducer, { ...initialState }),
	return: filterReducer('return', datesReducer, { ...initialState, isActive: false }),
});