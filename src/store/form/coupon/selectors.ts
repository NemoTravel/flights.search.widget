import { createSelector } from 'reselect';
import { ApplicationState, CouponState } from '../../../state';

const getCoupon = (state: ApplicationState): CouponState => {
	return state.form.coupon;
};

export const getCouponNumber = createSelector(
	[ getCoupon ],
	(coupon: CouponState) => coupon.number
);
