import {
	AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AUTOCOMPLETE_INPUT_VALUE_CHANGED,
	AIRPORT_SELECTED
} from 'actions';

const initialState = {
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
};

function autocomplete(state, { type, payload }) {
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

export default function autocompleteReducer(state = initialState, action) {
	if (action.autocompleteType) {
		return {
			...state,
			[action.autocompleteType]: autocomplete(state[action.autocompleteType], action)
		};
	}

	return state;
}