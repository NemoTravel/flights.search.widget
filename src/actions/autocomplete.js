import { 
	AUTOCOMPLETE_LOADING_STARTED, 
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AIRPORT_SELECTED
} from 'actions';
import { parseAutocompleteOptions } from 'parsers';
import { URL } from 'utils';

/**
 * Change the departure and the arrival airports.
 */
export function swapAirports() {
	return (dispatch, getState) => {
		const
			state = getState(),
			departureAirport = state.form.autocomplete.departure.airport,
			arrivalAirport = state.form.autocomplete.arrival.airport;

		if (departureAirport || arrivalAirport) {
			dispatch(selectAirport(departureAirport, 'arrival'));
			dispatch(selectAirport(arrivalAirport, 'departure'));
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
		
		let requestURL = `${state.system.API_URL}/guide/autocomplete/iata/${searchText}`;
		let requestParams = {
			apilang: state.system.locale
		};

		if (autocompleteType === 'arrival' && state.form.autocomplete.departure.airport) {
			requestURL += `/dep/${state.form.autocomplete.departure.airport.IATA}`;
		}

		if (state.system.routingGrid) {
			requestParams.airlineIATA = state.system.routingGrid;
		}

		fetch(URL(requestURL, requestParams))
			.then(response => response.json())
			.then(response => {
				const options = parseAutocompleteOptions(response);

				if (options) {
					dispatch(changeAutocompleteSuggestions(options, autocompleteType));
				}
				
				dispatch(finishAutocompleteLoading(autocompleteType));
			})
			.catch(() => {
				dispatch(changeAutocompleteSuggestions([], autocompleteType));
				dispatch(finishAutocompleteLoading(autocompleteType));
			});
	};
}