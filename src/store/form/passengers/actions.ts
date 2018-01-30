import { ADD_PASSENGER, REMOVE_PASSENGER, SET_PASSENGER_COUNTER } from '../../actions';
import { PassengerType } from '../../../state';
import { Action } from 'redux';

export interface PassengersAction extends Action {
	passengerType: PassengerType;
	payload?: number;
}

export const addPassenger = (passengerType: PassengerType): PassengersAction => {
	return {
		type: ADD_PASSENGER,
		passengerType
	};
};

export const removePassenger = (passengerType: PassengerType): PassengersAction => {
	return {
		type: REMOVE_PASSENGER,
		passengerType
	};
};

export const setCounter = (count: number, passengerType: PassengerType): PassengersAction => {
	return {
		type: SET_PASSENGER_COUNTER,
		passengerType,
		payload: count
	};
};
