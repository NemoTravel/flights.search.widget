import { ADD_PASSENGER, REMOVE_PASSENGER } from 'actions';

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

function passenger(state, { type }) {
	switch (type) {
		case ADD_PASSENGER:
			return { ...state, count: state.count + 1 };

		case REMOVE_PASSENGER:
			return { ...state, count: state.count - 1 };
	}

	return state;
}

export default function passengersReducer(state = initialState, action) {
	if (action.objectType) {
		return {
			...state,
			[action.objectType]: passenger(state[action.objectType], action)
		};
	}

	return state;
};