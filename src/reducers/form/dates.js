import { TOGGLE_DATEPICKER, SELECT_DATE } from 'actions';

export const DEPARTURE_DATE_TYPE = 'departure';
export const RETURN_DATE_TYPE = 'return';

const initialState = {
	[DEPARTURE_DATE_TYPE]: {
		isActive: true,
		date: null
	},
	[RETURN_DATE_TYPE]: {
		isActive: false,
		date: null
	}
};

function date(state, { type, payload }) {
	switch (type) {
		case TOGGLE_DATEPICKER:
			return { ...state, isActive: payload.isActive };

		case SELECT_DATE:
			return { ...state, date: payload.date };
	}

	return state;
}

export default function datesReducer(state = initialState, action) {
	if (action.dateType) {
		return {
			...state,
			[action.dateType]: date(state[action.dateType], action)
		};
	}

	return state;
}