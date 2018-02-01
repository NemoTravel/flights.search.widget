import {
	SET_CLASS_TYPE,
	TOGGLE_VICINITY_DATES,
	TOGGLE_DIRECT_FLIGHT,
	SET_VICINITY_DATES,
	SET_DIRECT_FLIGHT
} from '../../actions';
import { ServiceClass } from '../../../state';
import { Action } from 'redux';

export interface SetClassAction extends Action {
	payload: ServiceClass;
}

export interface BooleanAction extends Action {
	payload: boolean;
}

export const setClassType = (classType: ServiceClass): SetClassAction => {
	return {
		type: SET_CLASS_TYPE,
		payload: classType
	};
};

export const vicinityDatesAction = (): Action => {
	return {
		type: TOGGLE_VICINITY_DATES
	};
};

export const directFlightAction = (): Action => {
	return {
		type: TOGGLE_DIRECT_FLIGHT
	};
};

export const setVicinityDatesCheckbox = (checked: boolean): BooleanAction => {
	return {
		type: SET_VICINITY_DATES,
		payload: checked
	};
};

export const setDirectFlightCheckbox = (checked: boolean): BooleanAction => {
	return {
		type: SET_DIRECT_FLIGHT,
		payload: checked
	};
};
