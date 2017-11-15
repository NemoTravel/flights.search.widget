import { TOGGLE_COUPON, CHANGE_COUPON_NUMBER } from 'store/actions';
import { couponState } from 'state';

export const couponReducer = (state, { type, newValue }) => {
	switch (type) {
		case TOGGLE_COUPON:
			return { ...state, isActive: !state.isActive };
		case CHANGE_COUPON_NUMBER:
			return { ...state, number: newValue };
	}

	return state;
};

export default (state = couponState, action = {}) => {
	return couponReducer(state, action);
};