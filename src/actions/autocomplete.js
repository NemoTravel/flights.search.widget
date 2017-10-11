import { 
	AUTOCOMPLETE_LOADING_STARTED, 
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AIRPORT_SELECTED
} from 'actions';
import { parseNemoAutocompleteOptions, parseWebskyAutocompleteOptions } from 'parsers';
import { URL, clearURL, encodeURLParams } from 'utils';
import { MODE_WEBSKY } from 'state';

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

function runWebskyAutocomplete(dispatch, getState, IATA, autocompleteType) {
	const state = getState();
	
	dispatch(startAutocompleteLoading(autocompleteType));
	
	const searchType = autocompleteType === 'arrival' ? 'destination' : 'origin';
	let requestURL = `/json/dependence-cities`;

	fetch(requestURL, 
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'	
			},
			body: encodeURLParams({
				returnPoints: searchType,
				isBooking: true,
				cityCode: IATA
			})
		})
		.then(response => response.json())
		.then(response => {
			const options = parseWebskyAutocompleteOptions(response, searchType, state.system.locale);
	
			if (options) {
				dispatch(changeAutocompleteSuggestions(options, autocompleteType));
			}
	
			dispatch(finishAutocompleteLoading(autocompleteType));
		})
		.catch(() => {
			dispatch(changeAutocompleteSuggestions([], autocompleteType));
			dispatch(finishAutocompleteLoading(autocompleteType));
		});
}

function runNemoAutocomplete(dispatch, getState, searchText, autocompleteType) {
	const state = getState();
	
	dispatch(startAutocompleteLoading(autocompleteType));

	let requestURL = `${clearURL(state.system.baseURL)}/api/guide/autocomplete/iata/${searchText}`;
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
			const options = parseNemoAutocompleteOptions(response);
	
			if (options) {
				dispatch(changeAutocompleteSuggestions(options, autocompleteType));
			}
	
			dispatch(finishAutocompleteLoading(autocompleteType));
		})
		.catch(() => {
			dispatch(changeAutocompleteSuggestions([], autocompleteType));
			dispatch(finishAutocompleteLoading(autocompleteType));
		});
}

export function sendAutocompleteRequest(searchText, autocompleteType) {
	return (dispatch, getState) => getState().system.mode === MODE_WEBSKY ? 
		runWebskyAutocomplete(dispatch, getState, searchText, autocompleteType) : 
		runNemoAutocomplete(dispatch, getState, searchText, autocompleteType);
}