import {
	AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AUTOCOMPLETE_INPUT_VALUE_CHANGED,
	AIRPORT_SELECTED
} from 'actions';
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
		case AUTOCOMPLETE_LOADING_STARTED:
			return { ...state, isLoading: true };

		case AUTOCOMPLETE_LOADING_FINISHED:
			return { ...state, isLoading: false };

		case AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			return { ...state, suggestions: payload.suggestions };

		case AUTOCOMPLETE_INPUT_VALUE_CHANGED:
			return { ...state, inputValue: payload.value };

		case AIRPORT_SELECTED:
			return { ...state, airport: payload.airport };
	}

	return state;
}

export default combineReducers({
	departure: filterReducer('departure', autocompleteReducer, { ...initialState }),
	arrival: filterReducer('arrival', autocompleteReducer, { ...initialState })
});