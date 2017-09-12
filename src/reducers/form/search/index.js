import { types } from 'actions';
import { combineReducers } from 'redux';
import passengers from 'reducers/form/search/passengers';
import dates from 'reducers/form/search/dates';
import autocomplete from 'reducers/form/search/autocomplete';

// So, here we have two similar blocks that should be handled with the only one reducer.
// Departure block and the arrival block are absolutely identical, except the fact that
// the arrival block has datepicker disabled by default.
const initialState = {
	isLoading: false,
	suggestions: [],
	inputValue: '',
	airport: null
};

function departureSearchReducer(state = initialState, action) {
	return action.payload && action.payload.fieldType === 'departure' ? searchReducer(state, action) : state;
}

function arrivalSearchReducer(state = {...initialState }, action) {
	return action.payload && action.payload.fieldType === 'arrival' ? searchReducer(state, action) : state;
}

/**
 * The problem is that these two blocks are driven by identical actions.
 * Every action has a `fieldType` (`arrival` or `departure`) property in it's payload, 
 * so the functions above can decide which reducer to use with the dispatched action.
 * 
 * This solution should be used across the whole application.
 */
function searchReducer(state, { type, payload }) {
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
	departure: departureSearchReducer,
	arrival: arrivalSearchReducer,
	autocomplete,
	passengers,
	dates
});