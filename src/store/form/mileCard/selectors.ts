import { createSelector } from 'reselect';
import { ApplicationState, MileCardState } from '../../../state';

const getMileCard = (state: ApplicationState): MileCardState => state.form.mileCard;

export const getMileCardNumber = createSelector(
	[ getMileCard ],
	(mileCard: MileCardState): string => mileCard.number
);

export const getMileCardPassword = createSelector(
	[ getMileCard ],
	(mileCard: MileCardState): string => mileCard.password
);
