import { ADD_PASSENGER, REMOVE_PASSENGER } from 'actions';
import { i18n } from 'utils';

const initialState = {
	ADT: {
		title: i18n('form', 'passenger_ADT'),
		code: 'ADT',
		count: 1
	},
	CLD: {
		title: i18n('form', 'passenger_CLD'),
		code: 'CLD',
		count: 0
	},
	INF: {
		title: i18n('form', 'passenger_INF'),
		code: 'INF',
		count: 0
	},
	INS: {
		title: i18n('form', 'passenger_INS'),
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
	if (action.passengerType) {
		return {
			...state,
			[action.passengerType]: passenger(state[action.passengerType], action)
		};
	}

	return state;
}