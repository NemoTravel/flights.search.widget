import { types } from 'actions';
import { combineReducers } from 'redux';

const initialState = {
	isLoading: false,
	suggestions: [],
	inputValue: '',
	airport: null
};

function departureAutocompleteReducer(state = initialState, action) {
	return action.payload && action.payload.fieldType === 'departure' ? autocompleteReducer(state, action) : state;
}

function arrivalAutocompleteReducer(state = {...initialState }, action) {
	return action.payload && action.payload.fieldType === 'arrival' ? autocompleteReducer(state, action) : state;
}

function autocompleteReducer(state, { type, payload }) {
	switch (type) {
		case types.AUTOCOMPLETE_LOADING_STARTED:
			return { ...state, isLoading: true };

		case types.AUTOCOMPLETE_LOADING_FINISHED:
			return { ...state, isLoading: false };

		case types.AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			return { ...state, suggestions: payload.suggestions };

		case types.AUTOCOMPLETE_INPUT_VALUE_CHANGED:
			return { ...state, inputValue: payload.value };

		case types.AIRPORT_SELECTED:
			return { ...state, airport: payload.airport };
	}

	return state;
}

export default combineReducers({
	departure: departureAutocompleteReducer,
	arrival: arrivalAutocompleteReducer
});