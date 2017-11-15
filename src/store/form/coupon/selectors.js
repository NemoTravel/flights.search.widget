import { createSelector } from 'reselect';

const getCouponConfig = state => {
	return state.form.coupon;
};

export const isCouponActive = createSelector(
	[getCouponConfig],
	(couponConfig = {}) => {
		return couponConfig.isActive;
	}
);

export const getCouponNumber = createSelector(
	[getCouponConfig],
	(couponConfig = {}) => {
		return couponConfig.number;
	}
);