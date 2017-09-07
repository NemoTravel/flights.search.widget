import { types } from 'actions';

export function addPassenger(passType) {
	return {
		type: types.ADD_PASSENGER,
		payload: passType
	};
}

export function removePassenger(passType) {
	return {
		type: types.REMOVE_PASSENGER,
		payload: passType
	};
}