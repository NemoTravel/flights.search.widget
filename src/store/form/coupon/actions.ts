import { CHANGE_COUPON_NUMBER } from '../../actions';
import { Action } from 'redux';

export interface CouponAction extends Action {
	newValue: string;
}

export const changeCouponNumber = (newValue: string): CouponAction => {
	return {
		type: CHANGE_COUPON_NUMBER,
		newValue
	};
};
