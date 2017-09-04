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
	},
	autocomplete: {
		departure: {
			suggestions: [],
			value: ''
		},
		arrival: {
			suggestions: [],
			value: ''
		}
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
			newState.isLoading[action.payload.fieldType] = false;
			newState.autocomplete[action.payload.fieldType].suggestions = action.payload.array;
			return newState;
			
		case types.AUTOCOMPLETE_VALUE_CHANGED:
			newState = cloneDeep(state);
			newState.autocomplete[action.payload.fieldType].value = action.payload.value;
			return newState;

		default:
			return state;
	}
}