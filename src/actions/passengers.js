import { ADD_PASSENGER, REMOVE_PASSENGER } from 'actions';

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