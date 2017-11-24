import { createSelector } from 'reselect';

const getCoupon = state => {
	return state.form.coupon;
};

export const getCouponNumber = createSelector(
	[ getCoupon ],
	(coupon = {}) => coupon.number
);
