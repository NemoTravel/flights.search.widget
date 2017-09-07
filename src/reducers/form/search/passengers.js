import { types } from 'actions';

const initialState = {
	title: '',
	types: {
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
		}
	}
};

export default function passengersReducer(state = initialState, { type, payload }) {
	let newState = state;
	
	switch (type) {
		case types.ADD_PASSENGER:
			newState = { ...state };
			newState.types[payload].count++;
			return newState;
			
		case types.REMOVE_PASSENGER:
			newState = { ...state };
			newState.types[payload].count--;
			return newState;
			
		// @TODO: use Reselect instead?
		case types.CALCULATE_PASSENGERS_TITLE:
			newState = { ...state };
			
			let totalCount = 0,
				result = '';

			for (let passType in state.types) {
				if (state.types.hasOwnProperty(passType)) {
					totalCount += parseInt(state.types[passType].count);
				}
			}

			if (totalCount === 0 || totalCount > 4) {
				result = totalCount + ' Пассажиров';
			}
			else if (totalCount === 1) {
				result = totalCount + ' Пассажир';
			}
			else {
				result = totalCount + ' Пассажира';
			}

			newState.title = result;
			
			return newState;
	}
	
	return state;
}