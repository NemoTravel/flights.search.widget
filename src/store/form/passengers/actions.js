import { ADD_PASSENGER, REMOVE_PASSENGER, SET_PASSENGER_COUNTER } from 'store/actions';

export function addPassenger(passengerType) {
	return {
		type: ADD_PASSENGER,
		passengerType
	};
}

export function removePassenger(passengerType) {
	return {
		type: REMOVE_PASSENGER,
		passengerType
	};
}

export function setCounter(count, passengerType) {
	return {
		type: SET_PASSENGER_COUNTER,
		passengerType,
		payload: count
	}
}