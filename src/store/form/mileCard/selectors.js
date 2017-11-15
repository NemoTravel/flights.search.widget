import { createSelector } from 'reselect';

const getMileCardConfig = state => {
	return state.form.mileCard;
};

export const isMileCardActive = createSelector(
	[getMileCardConfig],
	(mileCardConfig = {}) => {
		return mileCardConfig.isActive;
	}
);

export const getMileCardNumber = createSelector(
	[getMileCardConfig],
	(mileCardConfig = {}) => {
		return mileCardConfig.number;
	}
);

export const getMileCardPassword = createSelector(
	[getMileCardConfig],
	(mileCardConfig = {}) => {
		return mileCardConfig.password;
	}
);