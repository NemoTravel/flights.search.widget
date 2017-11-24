import { CHANGE_MILE_CARD_NUMBER, CHANGE_MILE_CARD_PASSWORD } from 'store/actions';

export const changeMileCardNumber = newValue => {
	return {
		type: CHANGE_MILE_CARD_NUMBER,
		newValue
	};
};

export const changeMileCardPassword = newValue => {
	return {
		type: CHANGE_MILE_CARD_PASSWORD,
		newValue
	};
};
