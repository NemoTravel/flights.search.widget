import { ADD_PASSENGER, REMOVE_PASSENGER, SET_PASSENGER_COUNTER } from '../../actions';
import { PassengersState, passengersState, PassengerState } from '../../../state';
import { PassengersAction } from './actions';

export const setPassengersCounterReducer = (state: PassengerState, count: number): PassengerState => {
	return { ...state, count };
};

export const passengersReducer = (state: PassengerState, { type, payload }: PassengersAction): PassengerState => {
	switch (type) {
		case ADD_PASSENGER:
			return { ...state, count: state.count + 1 };

		case REMOVE_PASSENGER:
			return { ...state, count: state.count - 1 };

		case SET_PASSENGER_COUNTER:
			return setPassengersCounterReducer(state, payload);
	}

	return state;
};

export default (state: PassengersState = passengersState, action: PassengersAction): PassengersState => {
	if (action.passengerType) {
		return {
			...state,
			[action.passengerType]: passengersReducer(state[action.passengerType], action)
		};
	}

	return state;
};
