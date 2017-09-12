import { types } from 'actions';

const initialState = {
	ADT: {
		title: 'Взрослые (12+)',
		code: 'ADT',
		count: 1
	},
	CLD: {
		title: 'Дети (2-11)',
		code: 'CLD',
		count: 0
	},
	INF: {
		title: 'Младенцы (0-2)',
		code: 'INF',
		count: 0
	},
	INS: {
		title: 'Младенцы с местом (0-2)',
		code: 'INS',
		count: 0
	}
};

export default function passengersReducer(state = { ...initialState }, { type, payload }) {
	let newState = state;
	
	switch (type) {
		case types.ADD_PASSENGER:
			newState = { ...state };
			newState[payload].count++;
			return newState;
			
		case types.REMOVE_PASSENGER:
			newState = { ...state };
			newState[payload].count--;
			return newState;
	}
	
	return state;
}