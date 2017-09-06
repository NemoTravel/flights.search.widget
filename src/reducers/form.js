import { types } from 'actions';
import { cloneDeep } from 'lodash';

// Search form consists of three toggleable blocks:
const initialState = {
	// - search fields (airport autocompeletes, datepicker, passengers)
	search: {
		isActive: true,
		departure: {
			isLoading: false,
			isDatepickerActive: true,
			suggestions: [],
			inputValue: '',
			airport: null,
			date: null
		},
		arrival: {
			isLoading: false,
			isDatepickerActive: false,
			suggestions: [],
			inputValue: '',
			airport: null,
			date: null
		}
	},
	// - flight registration process
	registration: {
		isActive: false
	},
	// - block for checking booking status
	bookings: {
		isActive: false
	}
};

export default function form(state = initialState, action) {
	let newState = null;
	
	switch (action.type) {
		case types.TOGGLE_BLOCK:
			newState = cloneDeep(state);
			newState[action.payload].isActive = !state[action.payload].isActive;
			return newState;
			
		case types.TOGGLE_DATEPICKER:
			newState = cloneDeep(state);
			newState.search[action.payload.fieldType].isDatepickerActive = action.payload.isActive;
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
			
		case types.DATE_SELECTED:
			newState = cloneDeep(state);
			newState.search[action.payload.fieldType].date = action.payload.date;
			return newState;
			
		case types.SWITCH_AIRPORTS:
			const departureAirport = state.search.departure.airport;
			const arrivalAirport = state.search.arrival.airport;
			
			if (departureAirport || arrivalAirport) {
				newState = cloneDeep(state);
				
				const departureInpurtValue = newState.search.departure.inputValue;
				const arrivalInpurtValue = newState.search.arrival.inputValue;

				newState.search.departure.airport = arrivalAirport;
				newState.search.arrival.airport = departureAirport;

				newState.search.departure.inputValue = arrivalInpurtValue;
				newState.search.arrival.inputValue = departureInpurtValue;
				
				return newState;
			}

			return state;

		default:
			return state;
	}
}