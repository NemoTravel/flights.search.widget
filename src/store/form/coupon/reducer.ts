import { CHANGE_COUPON_NUMBER } from '../../actions';
import { CouponState, couponState } from '../../../state';
import { CouponAction } from './actions';

export const couponReducer = (state: CouponState, { type, newValue }: CouponAction): CouponState => {
	switch (type) {
		case CHANGE_COUPON_NUMBER:
			return { ...state, number: newValue };
	}

	return state;
};

export default (state: CouponState = couponState, action: CouponAction): CouponState => {
	return couponReducer(state, action);
};
