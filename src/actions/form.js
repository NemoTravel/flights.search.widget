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
		payload: { fieldType }
	};
}

export function finishAutocompleteLoading(fieldType) {
	return {
		type: types.AUTOCOMPLETE_LOADING_FINISHED,
		payload: { fieldType }
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

export function changeAutocompleteInputValue(value, fieldType) {
	return {
		type: types.AUTOCOMPLETE_INPUT_VALUE_CHANGED,
		payload: {
			fieldType,
			value
		}
	};
}

export function selectAirport(airport, fieldType) {
	return {
		type: types.AIRPORT_SELECTED,
		payload: {
			fieldType,
			airport
		}
	};
}

export function switchAirports() {
	return {
		type: types.SWITCH_AIRPORTS
	};
}

export function selectDate(date, fieldType) {
	return {
		type: types.DATE_SELECTED,
		payload: {
			fieldType,
			date
		}
	};
}

export function toggleDatePicker(isActive, fieldType) {
	return {
		type: types.TOGGLE_DATEPICKER,
		payload: {
			fieldType,
			isActive
		}
	};
}

export function sendAutocompleteRequest(searchText, fieldType) {
	return (dispatch, getState) => {
		const state = getState();
		
		dispatch(startAutocompleteLoading(fieldType));
		
		let url = `${state.system.API_URL}/guide/autocomplete/iata/${searchText}`;

		if (state.system.routingGrid) {
			url += `?airlineIATA=${state.system.routingGrid}`;
		}
		
		axios.get(url)
			.then((response) => {
				const data = response.data;
				
				// Some basic parser.
				if (data && data.guide.autocomplete.iata instanceof Array) {
					const { airports } = data.guide;
					const { iata } = data.guide.autocomplete;
					// Trying to match suggested airports by IATA.
					const suggestions = iata.filter(({ IATA }) => IATA in airports).map(({ IATA }) => airports[IATA]);
					
					// Clear previous suggestions first (to avoid rendering collisions).
					dispatch(changeAutocompleteSuggestions([], fieldType));
					dispatch(changeAutocompleteSuggestions(suggestions, fieldType));
					dispatch(finishAutocompleteLoading(fieldType));
				}
				else {
					dispatch(finishAutocompleteLoading(fieldType));
				}
			})
			.catch(() => {
				dispatch(changeAutocompleteSuggestions([], fieldType));
				dispatch(finishAutocompleteLoading(fieldType));
			});
	};
}