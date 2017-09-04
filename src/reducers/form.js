import { types } from 'actions';
import { cloneDeep } from 'lodash';

const initialState = {
	blockIsActive: {
		tickets: true,
		registration: false,
		bookings: false
	},
	isLoading: {
		departure: false,
		arrival: false
	}
};

export default function form(state = initialState, action) {
	let newState = null;
	
	switch (action.type) {
		case types.TOGGLE_BLOCK:
			newState = cloneDeep(state);
			newState.blockIsActive[action.payload] = !state.blockIsActive[action.payload];
			return newState;
			
		case types.AUTOCOMPLETE_IS_LOADING:
			newState = cloneDeep(state);
			newState.isLoading[action.payload] = true;
			return newState;
			
		case types.AUTOCOMPLETE_IS_LOADED:
			newState = cloneDeep(state);
			newState.isLoading[action.payload] = false;
			return newState;

		default:
			return state;
	}
}