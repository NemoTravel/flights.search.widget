import { TOGGLE_COUPON, CHANGE_COUPON_NUMBER } from 'store/actions';

export const toggleCoupon = () => {
	return {
		type: TOGGLE_COUPON
	};
};

export const changeCouponNumber = (newValue) => {
	return {
		type: CHANGE_COUPON_NUMBER,
		newValue
	};
};