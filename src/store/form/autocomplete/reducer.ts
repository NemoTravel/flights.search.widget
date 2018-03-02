import {
	AutocompleteDefaultGroupsState, AutocompleteFieldState, AutocompleteGroupState, AutocompleteState, SegmentState,
	autocompleteState, FormState
} from '../../../state';
import {
	AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AIRPORT_SELECTED,
	AUTOCOMPLETE_PUSH_TO_PREVIOUS
} from '../../actions';
import { AutocompleteAction, PreviousSearchAction } from './actions';
import { AnyAction } from 'redux';
import { Airport } from '../../../services/models/Airport';

export const autocompleteAirportReducer = (state: AutocompleteFieldState, airport: Airport): AutocompleteFieldState => {
	return { ...state, airport };
};

export const autocompleteGroupsReducer = (state: AutocompleteDefaultGroupsState, defaultGroup: AutocompleteGroupState): AutocompleteDefaultGroupsState => {
	return { ...state, [defaultGroup.name]: defaultGroup };
};

export const autocompleteReducer = (state: AutocompleteFieldState, { type, payload }: AutocompleteAction): AutocompleteFieldState => {
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
};

export const previousSearchReducer = (state: AutocompleteDefaultGroupsState, { type, payload }: PreviousSearchAction): AutocompleteDefaultGroupsState => {
	switch (type) {
		case AUTOCOMPLETE_PUSH_TO_PREVIOUS:
			return {
				...state,
				previousSearches: {
					...state.previousSearches,
					options: payload.pool
				}
			};
	}

	return state;
};

const isPreviousSearchAction = (action: AnyAction): action is PreviousSearchAction => {
	return 'isPreviousSearchAction' in action;
};

const isAutocompleteAction = (action: AnyAction): action is AutocompleteAction => {
	return 'autocompleteType' in action;
};

export const autocompleteMainReducer = (state: AutocompleteState = autocompleteState, action: AnyAction): AutocompleteState => {
	if (isPreviousSearchAction(action)) {
		return {
			...state,
			defaultGroups: previousSearchReducer(state.defaultGroups, action)
		};
	}
	else if (isAutocompleteAction(action)) {
		return {
			...state,
			[action.autocompleteType]: autocompleteReducer(state[action.autocompleteType], action)
		};
	}

	return state;
};

export default (state: AutocompleteState = autocompleteState, action: AnyAction): AutocompleteState => {
	console.log('im changed');
	return state;
};

/*export default (state: SegmentState[] = [], action: AnyAction): any => {
	let segmentId = action.segmentId || 0;

	console.log(state);
	return state.map( (segment: SegmentState, index: number) => {
		if (index === segmentId) {
			return {
				...segment,
				autocomlete: autocompleteMainReducer(segment.autocomplete, action)
			}
		}
		else {
			return segment;
		}
	});
}*/