import {
	AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AIRPORT_SELECTED,
	AUTOCOMPLETE_PUSH_TO_PREVIOUS
} from '../../../actions';
import { parseAutocompleteOptions, parseAirportFromGuide, parseNearestAirport } from '../../../../services/parsers';
import { parseDatesAvailability } from '../../../../services/parsers/datesAvailability';
import { URL, clearURL } from '../../../../utils';
import {
	ApplicationMode, ApplicationState, AutocompleteFieldType, CommonThunkAction,
	DatepickerFieldType, GetStateFunction,
	Language
} from '../../../../state';
import { setAvailableDates } from '../dates/actions';
import { AnyAction, Dispatch } from 'redux';
import { AutocompleteSuggestion } from '../../../../services/models/AutocompleteSuggestion';
import { Airport } from '../../../../services/models/Airport';
import { ResponseWithGuide } from '../../../../services/responses/Guide';

export interface AutocompleteAction {
	type: string;
	autocompleteType: AutocompleteFieldType;
	payload?: any;
	segmentId?: number;
}

export interface PreviousSearchAction {
	type: string;
	payload: any;
	isPreviousSearchAction: boolean;
}

/**
 * Show autocomplete field loading spinner.
 *
 * @param {AutocompleteFieldType} autocompleteType
 * @param {number} segmentId
 * @returns {AutocompleteAction}
 */
export const startAutocompleteLoading = (autocompleteType: AutocompleteFieldType, segmentId: number): AutocompleteAction => {
	return {
		type: AUTOCOMPLETE_LOADING_STARTED,
		autocompleteType,
		segmentId
	};
};

/**
 * Hide autocomplete field loading spinner.
 *
 * @param {AutocompleteFieldType} autocompleteType
 * @param {number} segmentId
 * @returns {AutocompleteAction}
 */
export const finishAutocompleteLoading = (autocompleteType: AutocompleteFieldType, segmentId: number): AutocompleteAction => {
	return {
		type: AUTOCOMPLETE_LOADING_FINISHED,
		autocompleteType,
		segmentId
	};
};

/**
 * Store an array of autocomplete options.
 *
 * @param {Array} suggestions
 * @param {AutocompleteFieldType} autocompleteType
 * @param {number} segmentId
 * @returns {AutocompleteAction}
 */
export const changeAutocompleteSuggestions = (suggestions: AutocompleteSuggestion[], autocompleteType: AutocompleteFieldType, segmentId: number = 0): AutocompleteAction => {
	return {
		type: AUTOCOMPLETE_SUGGESTIONS_CHANGED,
		autocompleteType,
		segmentId,
		payload: {
			suggestions
		}
	};
};

/**
 * Running request for getting list of dates with available flights.
 *
 * @param {Dispatch} dispatch
 * @param {ApplicationState} state
 * @param {DatepickerFieldType} type
 */
const runDatesAvailability = (dispatch: Dispatch<AnyAction>, state: ApplicationState, type: DatepickerFieldType): void => {
	let depIATA, arrIATA;

	if (type === DatepickerFieldType.Departure) {
		depIATA = state.form.segments[0].autocomplete.departure.airport.IATA;
		arrIATA = state.form.segments[0].autocomplete.arrival.airport.IATA;
	}
	else {
		depIATA = state.form.segments[0].autocomplete.arrival.airport.IATA;
		arrIATA = state.form.segments[0].autocomplete.departure.airport.IATA;
	}

	const requestURL = `${clearURL(state.system.nemoURL)}/api/proxy/websky/availability/dep/${depIATA}/arr/${arrIATA}`;
	const requestParams = {
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
				dispatch(setAvailableDates([], type));
			}
		})
		.catch(() => {
			dispatch(setAvailableDates([], type));
		});
};

/**
 * Running two request for getting dates with available flights:
 * - one for the forward direction
 * - one for the return flight
 *
 * (currently available for the WEBSKY mode only)
 *
 * @param {Dispatch} dispatch
 * @param {ApplicationState} getState
 */
export const getDatesAvailability = (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
	const state = getState();

	if (
		state.system.mode === ApplicationMode.WEBSKY &&
		state.system.highlightAvailableDates &&
		state.form.segments[0].autocomplete.departure.airport &&
		state.form.segments[0].autocomplete.arrival.airport
	) {
		// Searching available dates for the flight forward.
		runDatesAvailability(dispatch, state, DatepickerFieldType.Departure);

		// Searching available dates for the return flight.
		runDatesAvailability(dispatch, state, DatepickerFieldType.Return);
	}
};

/**
 * Store airport selected by user.
 *
 * @param {Object} airport
 * @param {number} segmentId
 * @param {AutocompleteFieldType} autocompleteType
 * @returns {AutocompleteAction}
 */
export const setSelectedAirport = (airport: any, autocompleteType: AutocompleteFieldType, segmentId: number = 0): AutocompleteAction => {
	return {
		type: AIRPORT_SELECTED,
		autocompleteType,
		segmentId,
		payload: {
			airport
		}
	};
};

/**
 * FIXME
 *
 * @param pool
 * @returns {AutocompleteAction}
 */
export const setAirportInPreviousSearchGroup = (pool: any): PreviousSearchAction => {
	return {
		type: AUTOCOMPLETE_PUSH_TO_PREVIOUS,
		isPreviousSearchAction: true,
		payload: {
			pool
		}
	};
};

/**
 * @param {Dispatch} dispatch
 * @param {Function} getState
 * @param airport
 */
export const pushAiprortInCache = (dispatch: Dispatch<AutocompleteAction>, getState: GetStateFunction, airport: Airport): void => {
	const MAX_NUM_OF_AIRPORTS = 9;
	const appState = getState();
	const state = appState.form.segments[0].autocomplete.defaultGroups.previousSearches.options;
	const newPool: any = {};
	let counter = 0;

	newPool[airport.IATA] = airport;

	for (const airport in state) {
		if (state.hasOwnProperty(airport)) {
			if (!newPool[state[airport].IATA]) {
				counter++;
			}

			newPool[state[airport].IATA] = state[airport];
		}

		if (counter >= MAX_NUM_OF_AIRPORTS) {
			break;
		}
	}

	dispatch(setAirportInPreviousSearchGroup(newPool));
};

/**
 * Store airport selected by user and run request for getting dates with available flight.
 *
 * @param {Object} airport
 * @param {number} segmentId
 * @param {AutocompleteFieldType} autocompleteType
 * @returns {Function}
 */
export const selectAirport = (airport: any, autocompleteType: AutocompleteFieldType, segmentId: number = 0): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		dispatch(setSelectedAirport(airport, autocompleteType, segmentId));
		getDatesAvailability(dispatch, getState);
		pushAiprortInCache(dispatch, getState, airport);
	};
};

interface AutocompleteParams {
	requestURL: string;
	dispatch: Dispatch<AnyAction>;
	autocompleteType: AutocompleteFieldType;
	aggregationOnly?: boolean;
	segmentId?: number;
}

/**
 * Running autocomplete request itself.
 *
 * @param {String} requestURL
 * @param {Function} dispatch
 * @param {AutocompleteFieldType} autocompleteType
 * @param {Boolean} aggregationOnly
 * @param {number} segmentId
 */
const runAutocomplete = ({ requestURL, dispatch, autocompleteType, aggregationOnly = false, segmentId = 0 }: AutocompleteParams): void => {
	dispatch(startAutocompleteLoading(autocompleteType, segmentId));

	fetch(requestURL)
		.then(response => response.json())
		.then(response => {
			const options = parseAutocompleteOptions(response, aggregationOnly);

			if (options) {
				dispatch(changeAutocompleteSuggestions(options, autocompleteType, segmentId));
			}

			dispatch(finishAutocompleteLoading(autocompleteType, segmentId));
		})
		.catch(() => {
			dispatch(changeAutocompleteSuggestions([], autocompleteType, segmentId));
			dispatch(finishAutocompleteLoading(autocompleteType, segmentId));
		});
};

interface AutocompleteRequestParams {
	apilang: Language;
	webskyURL?: string;
	airlineIATA?: string;
}

/**
 * Preparing request for Websky environment.
 *
 * @param {Function} dispatch
 * @param {Function} getState
 * @param {AutocompleteFieldType} autocompleteType
 */
const runWebskyAutocomplete = (dispatch: Dispatch<AnyAction>, getState: GetStateFunction, autocompleteType: AutocompleteFieldType): void => {
	const state = getState();
	const searchType = autocompleteType === 'arrival' ? 'arr' : 'dep';
	const aggregationOnly = state.system.aggregationOnly;
	let departureIATA = '';

	// For `arrival` autocomplete field, inject selected departure IATA code,
	// for loading proper list of arrival options.
	if (autocompleteType === AutocompleteFieldType.Arrival && state.form.segments[0].autocomplete.departure.airport) {
		departureIATA = state.form.segments[0].autocomplete.departure.airport.IATA;
	}

	const requestURL = `${clearURL(state.system.nemoURL)}/api/proxy/websky/cities/${departureIATA}/${searchType}`;
	const requestParams: AutocompleteRequestParams = {
		apilang: state.system.locale,
		webskyURL: encodeURIComponent(state.system.webskyURL)
	};

	runAutocomplete({
		requestURL: URL(requestURL, requestParams),
		dispatch,
		autocompleteType,
		aggregationOnly
	});
};

/**
 * Preparing request for Nemo environment.
 *
 * @param {Function} dispatch
 * @param {Function} getState
 * @param {String} searchText
 * @param {AutocompleteFieldType} autocompleteType
 * @param {number} segmentId
 */
const runNemoAutocomplete = (dispatch: Dispatch<AnyAction>, getState: GetStateFunction, searchText: string, autocompleteType: AutocompleteFieldType, segmentId: number = 0): void => {
	const state = getState();

	let requestURL = `${clearURL(state.system.nemoURL)}/api/guide/autocomplete/iata/${searchText}`;
	const requestParams: AutocompleteRequestParams = {
		apilang: state.system.locale
	};

	// For `arrival` autocomplete field, inject selected departure IATA code,
	// for loading proper list of arrival options.
	if (autocompleteType === 'arrival' && state.form.segments[0].autocomplete.departure.airport) {
		requestURL += `/dep/${state.form.segments[0].autocomplete.departure.airport.IATA}`;
	}

	if (state.system.routingGrid) {
		requestParams.airlineIATA = state.system.routingGrid;
	}

	runAutocomplete({
		requestURL: URL(requestURL, requestParams),
		dispatch,
		autocompleteType,
		segmentId
	});
};

/**
 * Send request for getting autocomplete options.
 *
 * @param {String} searchText
 * @param {AutocompleteFieldType} autocompleteType
 * @param {number} segmentId
 * @returns {Function}
 */
export const sendAutocompleteRequest = (searchText: string, autocompleteType: AutocompleteFieldType, segmentId: number = 0): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		if (getState().system.mode === ApplicationMode.WEBSKY) {
			runWebskyAutocomplete(dispatch, getState, autocompleteType);
		}
		else {
			runNemoAutocomplete(dispatch, getState, searchText, autocompleteType, segmentId);
		}
	};
};

/**
 * Load airport by IATA code and set it as the default airport for departure or arrival.
 *
 * @param {String} IATA
 * @param {AutocompleteFieldType} autocompleteType
 * @returns {Function}
 */
export const loadAirportForAutocomplete = (IATA: string, autocompleteType: AutocompleteFieldType): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const { nemoURL, locale } = getState().system;

		fetch(`${nemoURL}/api/guide/airports/${IATA}?apilang=${locale}`)
			.then((response: Response) => response.json())
			.then((response: ResponseWithGuide) => dispatch(setSelectedAirport(parseAirportFromGuide(response, IATA), autocompleteType)));
	};
};

/**
 * Load nearest airport and set it as the default airport for departure or arrival.
 *
 * @param {AutocompleteFieldType} autocompleteType
 * @returns {Function}
 */
export const loadNearestAirportForAutocomplete = (autocompleteType: AutocompleteFieldType): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const { nemoURL, locale } = getState().system;

		fetch(`${nemoURL}/api/guide/airports/nearest?apilang=${locale}`)
			.then(response => response.json())
			.then(response => dispatch(setSelectedAirport(parseNearestAirport(response), autocompleteType)));
	};
};

/**
 * Change the departure and the arrival airports.
 */
export const swapAirports = (segmentId: number): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const
			state = getState(),
			departureAirport = state.form.segments[segmentId].autocomplete.departure.airport,
			arrivalAirport = state.form.segments[segmentId].autocomplete.arrival.airport;

		if (departureAirport || arrivalAirport) {
			dispatch(setSelectedAirport(departureAirport, AutocompleteFieldType.Arrival, segmentId));
			dispatch(setSelectedAirport(arrivalAirport, AutocompleteFieldType.Departure, segmentId));
			getDatesAvailability(dispatch, getState);
		}
	};
};
