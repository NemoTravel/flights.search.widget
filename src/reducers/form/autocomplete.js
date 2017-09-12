import { types } from 'actions';
import { combineReducers } from 'redux';
import { filterReducer } from 'reducers';

const initialState = {
	isLoading: false,
	suggestions: [],
	inputValue: '',
	airport: null
};

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
	departure: filterReducer('departure', autocompleteReducer, { ...initialState }),
	arrival: filterReducer('arrival', autocompleteReducer, { ...initialState })
});