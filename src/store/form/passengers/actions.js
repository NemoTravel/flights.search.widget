import { ADD_PASSENGER, REMOVE_PASSENGER, SET_PASSENGER_COUNTER } from 'store/actions';

export const addPassenger = passengerType => {
	return {
		type: ADD_PASSENGER,
		passengerType
	};
};

export const removePassenger = passengerType => {
	return {
		type: REMOVE_PASSENGER,
		passengerType
	};
};

export const setCounter = (count, passengerType) => {
	return {
		type: SET_PASSENGER_COUNTER,
		passengerType,
		payload: count
	};
};
