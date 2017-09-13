import axios from 'axios';
import { 
	AUTOCOMPLETE_LOADING_STARTED, 
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AUTOCOMPLETE_INPUT_VALUE_CHANGED,
	AIRPORT_SELECTED
} from 'actions';

/**
 * Change the departure and the arrival airports.
 */
export function switchAirports() {
	return (dispatch, getState) => {
		const
			state = getState(),
			departureAirport = state.form.autocomplete.departure.airport,
			arrivalAirport = state.form.autocomplete.arrival.airport;

		if (departureAirport || arrivalAirport) {
			const
				departureInputValue = state.form.autocomplete.departure.inputValue,
				arrivalInputValue = state.form.autocomplete.arrival.inputValue;

			dispatch(selectAirport(departureAirport, 'arrival'));
			dispatch(selectAirport(arrivalAirport, 'departure'));

			dispatch(changeAutocompleteInputValue(departureInputValue, 'arrival'));
			dispatch(changeAutocompleteInputValue(arrivalInputValue, 'departure'));
		}
	};
}

export function startAutocompleteLoading(autocompleteType) {
	return {
		type: AUTOCOMPLETE_LOADING_STARTED,
		autocompleteType
	};
}

export function finishAutocompleteLoading(autocompleteType) {
	return {
		type: AUTOCOMPLETE_LOADING_FINISHED,
		autocompleteType
	};
}

export function changeAutocompleteSuggestions(suggestions, autocompleteType) {
	return {
		type: AUTOCOMPLETE_SUGGESTIONS_CHANGED,
		autocompleteType,
		payload: {
			suggestions
		}
	};
}

export function changeAutocompleteInputValue(value, autocompleteType) {
	return {
		type: AUTOCOMPLETE_INPUT_VALUE_CHANGED,
		autocompleteType,
		payload: {
			value
		}
	};
}

export function selectAirport(airport, autocompleteType) {
	return {
		type: AIRPORT_SELECTED,
		autocompleteType,
		payload: {
			airport
		}
	};
}

export function sendAutocompleteRequest(searchText, autocompleteType) {
	return (dispatch, getState) => {
		const state = getState();

		dispatch(startAutocompleteLoading(autocompleteType));

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
					dispatch(changeAutocompleteSuggestions([], autocompleteType));
					dispatch(changeAutocompleteSuggestions(suggestions, autocompleteType));
					dispatch(finishAutocompleteLoading(autocompleteType));
				}
				else {
					dispatch(finishAutocompleteLoading(autocompleteType));
				}
			})
			.catch(() => {
				dispatch(changeAutocompleteSuggestions([], autocompleteType));
				dispatch(finishAutocompleteLoading(autocompleteType));
			});
	};
}