import { ADD_PASSENGER, REMOVE_PASSENGER } from 'actions';
import { combineReducers } from 'redux';
import { filterReducer } from 'reducers';

const initialState = {
	title: '',
	code: '',
	count: 0
};

function passengersReducer(state, { type, payload }) {
	switch (type) {
		case ADD_PASSENGER:
			return { ...state, count: state.count + 1 };
			
		case REMOVE_PASSENGER:
			return { ...state, count: state.count - 1 };
	}
	
	return state;
}

export default combineReducers({
	ADT: filterReducer('ADT', passengersReducer, { ...initialState, code: 'ADT', title: 'Взрослые (12+)', count: 1 }),
	CLD: filterReducer('CLD', passengersReducer, { ...initialState, code: 'CLD', title: 'Дети (2-11)' }),
	INF: filterReducer('INF', passengersReducer, { ...initialState, code: 'INF', title: 'Младенцы (0-2)' }),
	INS: filterReducer('INS', passengersReducer, { ...initialState, code: 'INS', title: 'Младенцы с местом (0-2)' })
});