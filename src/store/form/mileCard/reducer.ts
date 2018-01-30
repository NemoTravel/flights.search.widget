import { CHANGE_MILE_CARD_NUMBER, CHANGE_MILE_CARD_PASSWORD } from '../../actions';
import { MileCardState, mileCardState } from '../../../state';
import { MileCardAction } from './actions';

export const mileCardReducer = (state, { type, newValue }: MileCardAction): MileCardState => {
	switch (type) {
		case CHANGE_MILE_CARD_NUMBER:
			return { ...state, number: newValue };

		case CHANGE_MILE_CARD_PASSWORD:
			return { ...state, password: newValue };
	}

	return state;
};

export default (state: MileCardState = mileCardState, action: MileCardAction): MileCardState => {
	return mileCardReducer(state, action);
};
