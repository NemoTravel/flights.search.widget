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

export function showAutocompleteLoading(fieldType) {
	return {
		type: types.AUTOCOMPLETE_IS_LOADING,
		payload: fieldType
	};
}

export function autocompleteIsLoaded(array, fieldType) {
	return {
		type: types.AUTOCOMPLETE_IS_LOADED,
		payload: {
			fieldType,
			array
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

export function autocompleteRequest(searchText, fieldType) {
	return (dispatch, getState) => {
		const state = getState();
		
		dispatch(showAutocompleteLoading(fieldType));
		
		axios.get(`${state.system.API_URL}/autocomplete/${encodeURIComponent(searchText)}`)
			.then((response) => {
				const data = response.data;
				
				if (data && data.guide.autocomplete.iata instanceof Array) {
					dispatch(autocompleteIsLoaded(data.guide.autocomplete.iata, fieldType));
				}
				else {
					dispatch(autocompleteIsLoaded([], fieldType));
				}
			});
	};
}