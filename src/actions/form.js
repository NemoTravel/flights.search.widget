import { types } from 'actions';
import axios from 'axios';

/**
 * Show/hide dropdown blocks on the search form.
 * 
 * @param blockName
 * @returns {Object}
 */
export function toggleBlock(blockName) {
	return {
		type: types.TOGGLE_BLOCK,
		payload: blockName
	}
}

export function startAutocompleteLoading(fieldType) {
	return {
		type: types.AUTOCOMPLETE_LOADING_STARTED,
		payload: fieldType
	};
}

export function finishAutocompleteLoading(fieldType) {
	return {
		type: types.AUTOCOMPLETE_LOADING_FINISHED,
		payload: fieldType
	};
}

export function changeAutocompleteSuggestions(suggestions, fieldType) {
	return {
		type: types.AUTOCOMPLETE_SUGGESTIONS_CHANGED,
		payload: {
			fieldType,
			suggestions
		}
	};
}

export function changeAutocompleteValue(value, fieldType) {
	return {
		type: types.AUTOCOMPLETE_VALUE_CHANGED,
		payload: {
			fieldType,
			value
		}
	};
}

export function sendAutocompleteRequest(searchText, fieldType) {
	return (dispatch, getState) => {
		const state = getState();
		
		dispatch(startAutocompleteLoading(fieldType));
		
		axios.get(`${state.system.API_URL}/autocomplete/${encodeURIComponent(searchText)}`)
			.then((response) => {
				const data = response.data;
				
				if (data && data.guide.autocomplete.iata instanceof Array) {
					dispatch(changeAutocompleteSuggestions(data.guide.autocomplete.iata, fieldType));
					dispatch(finishAutocompleteLoading(fieldType));
				}
				else {
					dispatch(finishAutocompleteLoading([], fieldType));
				}
			});
	};
}