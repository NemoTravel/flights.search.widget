import { CHANGE_MILE_CARD_NUMBER, CHANGE_MILE_CARD_PASSWORD } from '../../actions';
import { Action } from 'redux';

export interface MileCardAction extends Action {
	newValue: string;
}

export const changeMileCardNumber = (newValue: string): MileCardAction => {
	return {
		type: CHANGE_MILE_CARD_NUMBER,
		newValue
	};
};

export const changeMileCardPassword = (newValue: string): MileCardAction => {
	return {
		type: CHANGE_MILE_CARD_PASSWORD,
		newValue
	};
};
