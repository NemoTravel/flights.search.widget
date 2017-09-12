import { types } from 'actions';

export function addPassenger(objectType) {
	return {
		type: types.ADD_PASSENGER,
		objectType
	};
}

export function removePassenger(objectType) {
	return {
		type: types.REMOVE_PASSENGER,
		objectType
	};
}