import { types } from 'actions';
import { cloneDeep } from 'lodash';

const initialState = {
	blockIsActive: {
		tickets: true,
		registration: false,
		bookings: false
	},
	search: {
		departure: {
			isLoading: false,
			suggestions: [],
			inputValue: '',
			airport: null
		},
		arrival: {
			isLoading: false,
			suggestions: [],
			inputValue: '',
			airport: null
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
			newState.search[action.payload].isLoading = true;
			return newState;
			
		case types.AUTOCOMPLETE_LOADING_FINISHED:
			newState = cloneDeep(state);
			newState.search[action.payload].isLoading = false;
			return newState;
			
		case types.AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			newState = cloneDeep(state);
			newState.search[action.payload.fieldType].suggestions = action.payload.suggestions;
			return newState;
			
		case types.AUTOCOMPLETE_INPUT_VALUE_CHANGED:
			newState = cloneDeep(state);
			newState.search[action.payload.fieldType].inputValue = action.payload.value;
			return newState;
			
		case types.AIRPORT_SELECTED:
			newState = cloneDeep(state);
			newState.search[action.payload.fieldType].airport = action.payload.airport;
			return newState;

		default:
			return state;
	}
}