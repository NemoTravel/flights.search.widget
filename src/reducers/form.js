import { types } from 'actions';
import { cloneDeep } from 'lodash';

const initialState = {
	blockIsActive: {
		tickets: true,
		registration: false,
		bookings: false
	},
	autocomplete: {
		departure: {
			isLoading: false,
			suggestions: [],
			value: ''
		},
		arrival: {
			isLoading: false,
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
			
		case types.AUTOCOMPLETE_LOADING_STARTED:
			newState = cloneDeep(state);
			newState.autocomplete[action.payload].isLoading = true;
			return newState;
			
		case types.AUTOCOMPLETE_LOADING_FINISHED:
			newState = cloneDeep(state);
			newState.autocomplete[action.payload].isLoading = false;
			return newState;
			
		case types.AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			newState = cloneDeep(state);
			newState.autocomplete[action.payload.fieldType].suggestions = action.payload.suggestions;
			return newState;
			
		case types.AUTOCOMPLETE_VALUE_CHANGED:
			newState = cloneDeep(state);
			newState.autocomplete[action.payload.fieldType].value = action.payload.value;
			return newState;

		default:
			return state;
	}
}