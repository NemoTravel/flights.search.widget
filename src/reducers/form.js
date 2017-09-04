import { types } from 'actions';
import { cloneDeep } from 'lodash';

const initialState = {
	blockIsActive: {
		tickets: true,
		registration: false,
		bookings: false
	}
};

export default function form(state = initialState, action) {
	switch (action.type) {
		case types.TOGGLE_BLOCK:
			let newState = cloneDeep(state);
			newState.blockIsActive[action.payload] = !state.blockIsActive[action.payload];
			return newState;

		default:
			return state;
	}
}