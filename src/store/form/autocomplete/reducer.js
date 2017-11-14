import { autocompleteState } from 'state';
import {
	AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AIRPORT_SELECTED,
	AUTOCOMPLETE_PUSH_TO_PREVIOUS
} from 'store/actions';

export const autocompleteAirportReducer = (state, airport) => {
	return { ...state, airport };
};

export const autocompleteGroupsReducer = (state, defaultGroup) => {
	return { ...state, [defaultGroup.name]: defaultGroup };
};

export const autocompleteReducer = (state, { type, payload }) => {
	switch (type) {
		case AUTOCOMPLETE_LOADING_STARTED:
			return { ...state, isLoading: true };

		case AUTOCOMPLETE_LOADING_FINISHED:
			return { ...state, isLoading: false };

		case AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			return { ...state, suggestions: payload.suggestions };

		case AIRPORT_SELECTED:
			return autocompleteAirportReducer(state, payload.airport);

		case AUTOCOMPLETE_PUSH_TO_PREVIOUS:
			return { ...state, previousSearches: {
				...state.previousSearches,
				options: { ...state.previousSearches.options, [payload.airport.IATA]: payload.airport }
			}};
	}

	return state;
};

export default (state = autocompleteState, action = {}) => {
	if (action.autocompleteType) {
		return {
			...state,
			[action.autocompleteType]: autocompleteReducer(state[action.autocompleteType], action)
		};
	}

	return state;
};
