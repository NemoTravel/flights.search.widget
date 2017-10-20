import {
	AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AIRPORT_SELECTED
} from 'store/actions';
import { parseAutocompleteOptions, parseAirportFromGuide, parseNearestAirport } from 'services/parsers';
import { parseDatesAvailability } from 'services/parsers/datesAvailability';
import { URL, clearURL } from 'utils';
import { MODE_WEBSKY } from 'state';
import { setAvailableDates } from 'store/form/dates/actions';

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
			dispatch(setSelectedAirport(departureAirport, 'arrival'));
			dispatch(setSelectedAirport(arrivalAirport, 'departure'));
			dispatch(getDatesAvailability);
		}
	};
}

/**
 * Show autocomplete field loading spinner.
 * 
 * @param {String} autocompleteType
 * @returns {Object}
 */
export function startAutocompleteLoading(autocompleteType) {
	return {
		type: AUTOCOMPLETE_LOADING_STARTED,
		autocompleteType
	};
}

/**
 * Hide autocomplete field loading spinner.
 *
 * @param {String} autocompleteType
 * @returns {Object}
 */
export function finishAutocompleteLoading(autocompleteType) {
	return {
		type: AUTOCOMPLETE_LOADING_FINISHED,
		autocompleteType
	};
}

/**
 * Store an array of autocomplete options.
 *
 * @param {Array} suggestions
 * @param {String} autocompleteType
 * @returns {Object}
 */
export function changeAutocompleteSuggestions(suggestions, autocompleteType) {
	return {
		type: AUTOCOMPLETE_SUGGESTIONS_CHANGED,
		autocompleteType,
		payload: {
			suggestions
		}
	};
}

/**
 * Running request for getting list of dates with available flights.
 * 
 * @param {Function} dispatch
 * @param {Object} state
 * @param {String} type
 */
function runDatesAvailability(dispatch, state, type) {
	let depIATA = state.form.autocomplete[type === 'departure' ? 'departure' : 'arrival'].airport.IATA;
	let arrIATA = state.form.autocomplete[type === 'departure' ? 'arrival' : 'departure'].airport.IATA;

	let requestURL = `${clearURL(state.system.nemoURL)}/api/proxy/websky/availability/dep/${depIATA}/arr/${arrIATA}`;
	let requestParams = {
		webskyURL: encodeURIComponent(state.system.webskyURL)
	};

	fetch(URL(requestURL, requestParams))
		.then(response => response.json())
		.then(response => {
			const dates = parseDatesAvailability(response);
	
			if (dates) {
				dispatch(setAvailableDates(dates, type));
			}
			else {
				dispatch(setAvailableDates({}, type));
			}
		})
		.catch(() => {
			dispatch(setAvailableDates({}, type));
		});
}

/**
 * Running two request for getting dates with available flights:
 * - one for the forward direction
 * - one for the return flight
 * 
 * (currently available for the WEBSKY mode only)
 *
 * @param {Function} dispatch
 * @param {Function} getState
 */
function getDatesAvailability(dispatch, getState) {
	const state = getState();
	
	if (
		state.system.mode === MODE_WEBSKY &&
		state.system.highlightAvailableDates &&
		state.form.autocomplete.departure.airport &&
		state.form.autocomplete.arrival.airport
	) {
		// Searching available dates for the flight forward.
		runDatesAvailability(dispatch, state, 'departure');
		// Searching available dates for the return flight.
		runDatesAvailability(dispatch, state, 'return');
	}
}

/**
 * Store airport selected by user and run request for getting dates with available flight.
 * 
 * @param {Object} airport
 * @param {String} autocompleteType
 * @returns {Function}
 */
export function selectAirport(airport, autocompleteType) {
	return (dispatch, getState) => {
		dispatch(setSelectedAirport(airport, autocompleteType));
		getDatesAvailability(dispatch, getState);
	};
}

/**
 * Store airport selected by user.
 * 
 * @param {Object} airport
 * @param {String} autocompleteType
 * @returns {Object}
 */
export function setSelectedAirport(airport, autocompleteType) {
	return {
		type: AIRPORT_SELECTED,
		autocompleteType,
		payload: {
			airport
		}
	};
}

/**
 * Running autocomplete request itself.
 * 
 * @param {String} requestURL
 * @param {Function} dispatch
 * @param {String} autocompleteType
 */
function runAutocomplete({ requestURL, dispatch, autocompleteType }) {
	dispatch(startAutocompleteLoading(autocompleteType));
	
	fetch(requestURL)
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
}

/**
 * Preparing request for Websky environment.
 * 
 * @param {Function} dispatch
 * @param {Function} getState
 * @param {String} autocompleteType
 */
function runWebskyAutocomplete(dispatch, getState, autocompleteType) {
	const state = getState();
	const searchType = autocompleteType === 'arrival' ? 'arr' : 'dep';
	let departureIATA = '';
	
	// For `arrival` autocomplete field, inject selected departure IATA code, 
	// for loading proper list of arrival options.
	if (autocompleteType === 'arrival' && state.form.autocomplete.departure.airport) {
		departureIATA = state.form.autocomplete.departure.airport.IATA;
	}
	
	let requestURL = `${clearURL(state.system.nemoURL)}/api/proxy/websky/cities/${departureIATA}/${searchType}`;
	let requestParams = {
		apilang: state.system.locale,
		webskyURL: encodeURIComponent(state.system.webskyURL)
	};

	runAutocomplete({
		requestURL: URL(requestURL, requestParams),
		dispatch,
		autocompleteType
	});
}

/**
 * Preparing request for Nemo environment.
 * 
 * @param {Function} dispatch
 * @param {Function} getState
 * @param {String} searchText
 * @param {String} autocompleteType
 */
function runNemoAutocomplete(dispatch, getState, searchText, autocompleteType) {
	const state = getState();

	let requestURL = `${clearURL(state.system.nemoURL)}/api/guide/autocomplete/iata/${searchText}`;
	let requestParams = {
		apilang: state.system.locale
	};

	// For `arrival` autocomplete field, inject selected departure IATA code, 
	// for loading proper list of arrival options.
	if (autocompleteType === 'arrival' && state.form.autocomplete.departure.airport) {
		requestURL += `/dep/${state.form.autocomplete.departure.airport.IATA}`;
	}

	if (state.system.routingGrid) {
		requestParams.airlineIATA = state.system.routingGrid;
	}

	runAutocomplete({
		requestURL: URL(requestURL, requestParams),
		dispatch,
		autocompleteType
	});
}

/**
 * Send request for getting autocomplete options.
 * 
 * @param {String} searchText
 * @param {String} autocompleteType
 * @returns {Function}
 */
export function sendAutocompleteRequest(searchText, autocompleteType) {
	return (dispatch, getState) => getState().system.mode === MODE_WEBSKY ? 
		runWebskyAutocomplete(dispatch, getState, autocompleteType) : 
		runNemoAutocomplete(dispatch, getState, searchText, autocompleteType);
}

/**
 * Load airport by IATA code and set it as the default airport for departure or arrival.
 * 
 * @param {String} IATA
 * @param {String} autocompleteType
 * @returns {Function}
 */
export function loadAirportForAutocomplete(IATA, autocompleteType) {
	return (dispatch, getState) => {
		fetch(`${getState().system.nemoURL}/api/guide/airports/${IATA}`)
			.then(response => response.json())
			.then(response => dispatch(setSelectedAirport(parseAirportFromGuide(response, IATA), autocompleteType)))
	};
}

/**
 * Load nearest airport and set it as the default airport for departure or arrival.
 *
 * @param {String} autocompleteType
 * @returns {Function}
 */
export function loadNearestAirportForAutocomplete(autocompleteType) {
	return (dispatch, getState) => {
		fetch(`${getState().system.nemoURL}/api/guide/airports/nearest`)
			.then(response => response.json())
			.then(response => dispatch(setSelectedAirport(parseNearestAirport(response), autocompleteType)))
	};
}