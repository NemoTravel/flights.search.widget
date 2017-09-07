import { types } from 'actions';

const initialState = {
	ADT: {
		title: 'Взрослые (12+)',
		code: 'ADT',
		isActive: true,
		count: 1
	},
	CLD: {
		title: 'Дети (2-11)',
		code: 'CLD',
		isActive: true,
		count: 0
	},
	INF: {
		title: 'Младенцы (0-2)',
		code: 'INF',
		isActive: true,
		count: 0
	},
	INS: {
		title: 'Младенцы с местом (0-2)',
		code: 'INS',
		isActive: false,
		count: 0
	},
};

export default function passengersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case types.ADD_PASSENGER:
			return state;
			
		case types.REMOVE_PASSENGER:
			return state;
	}
	
	return state;
}