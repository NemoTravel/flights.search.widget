import { ADD_PASSENGER, REMOVE_PASSENGER } from 'actions';

export function addPassenger(objectType) {
	return {
		type: ADD_PASSENGER,
		objectType
	};
}

export function removePassenger(objectType) {
	return {
		type: REMOVE_PASSENGER,
		objectType
	};
}