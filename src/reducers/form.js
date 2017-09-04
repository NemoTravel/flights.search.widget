import ActionsCreator from 'ActionsCreator';
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
		case ActionsCreator.TOGGLE_BLOCK:
			let newState = cloneDeep(state);
			newState.blockIsActive[action.blockName] = !state.blockIsActive[action.blockName];
			return newState;

		default:
			return state;
	}
}