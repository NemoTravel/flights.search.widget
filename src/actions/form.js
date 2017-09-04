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

export function hideAutocompleteLoading(fieldType) {
	return {
		type: types.AUTOCOMPLETE_IS_LOADED,
		payload: fieldType
	};
}

export function autocompleteRequest(searchText, fieldType) {
	return (dispatch, getState) => {
		const state = getState();
		
		dispatch(showAutocompleteLoading(fieldType));
		
		axios.get(`${state.system.API_URL}/autocomplete/${encodeURIComponent(searchText)}`)
			.then((response) => {
				const data = response.data;
	
				if (data) {
					// TODO
				}

				dispatch(hideAutocompleteLoading(fieldType));
			});
	};
}