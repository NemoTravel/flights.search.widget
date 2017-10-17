import { autocompleteState } from 'state';
import {
	AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AIRPORT_SELECTED
} from 'store/actions';

export function autocompleteAirportReducer(state, airport) {
	return { ...state, airport };
}

export function autocompleteReducer(state, { type, payload }) {
	switch (type) {
		case AUTOCOMPLETE_LOADING_STARTED:
			return { ...state, isLoading: true };

		case AUTOCOMPLETE_LOADING_FINISHED:
			return { ...state, isLoading: false };

		case AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			return { ...state, suggestions: payload.suggestions };

		case AIRPORT_SELECTED:
			return autocompleteAirportReducer(state, payload.airport);
	}

	return state;
}

export default function(state = autocompleteState, action) {
	if (action.autocompleteType) {
		return {
			...state,
			[action.autocompleteType]: autocompleteReducer(state[action.autocompleteType], action)
		};
	}

	return state;
}