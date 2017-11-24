import { CHANGE_COUPON_NUMBER } from 'store/actions';

export const changeCouponNumber = newValue => {
	return {
		type: CHANGE_COUPON_NUMBER,
		newValue
	};
};
