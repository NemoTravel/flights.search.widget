import { createSelector } from 'reselect';

const getMileCard = state => state.form.mileCard;

export const getMileCardNumber = createSelector(
	[ getMileCard ],
	(mileCard = {}) => mileCard.number
);

export const getMileCardPassword = createSelector(
	[ getMileCard ],
	(mileCard = {}) => mileCard.password
);
