import { types } from 'actions';
import axios from 'axios';

export function switchAirports() {
	return {
		type: types.SWITCH_AIRPORTS
	};
}

export function startAutocompleteLoading(objectType) {
	return {
		type: types.AUTOCOMPLETE_LOADING_STARTED,
		objectType
	};
}

export function finishAutocompleteLoading(objectType) {
	return {
		type: types.AUTOCOMPLETE_LOADING_FINISHED,
		objectType
	};
}

export function changeAutocompleteSuggestions(suggestions, objectType) {
	return {
		type: types.AUTOCOMPLETE_SUGGESTIONS_CHANGED,
		objectType,
		payload: {
			suggestions
		}
	};
}

export function changeAutocompleteInputValue(value, objectType) {
	return {
		type: types.AUTOCOMPLETE_INPUT_VALUE_CHANGED,
		objectType,
		payload: {
			value
		}
	};
}

export function selectAirport(airport, objectType) {
	return {
		type: types.AIRPORT_SELECTED,
		objectType,
		payload: {
			airport
		}
	};
}

export function sendAutocompleteRequest(searchText, objectType) {
	return (dispatch, getState) => {
		const state = getState();

		dispatch(startAutocompleteLoading(objectType));

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
					dispatch(changeAutocompleteSuggestions([], objectType));
					dispatch(changeAutocompleteSuggestions(suggestions, objectType));
					dispatch(finishAutocompleteLoading(objectType));
				}
				else {
					dispatch(finishAutocompleteLoading(objectType));
				}
			})
			.catch(() => {
				dispatch(changeAutocompleteSuggestions([], objectType));
				dispatch(finishAutocompleteLoading(objectType));
			});
	};
}