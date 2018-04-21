import { AnyAction, Dispatch } from 'redux';
import { SHOW_ERRORS} from '../actions';
import { formIsValid } from './selectors';
import {
	ApplicationMode, ApplicationState, CommonThunkAction, GetStateFunction, PassengerState,
	SegmentState, SearchInfo, OnSearchFunction, SearchInfoSegment, SearchInfoPassenger, RouteType, SEGMENTS_COUNT_RT
} from '../../state';
import { URL, clearURL } from '../../utils';

export interface ShowErrorsAction {
	type: string;
	payload: boolean;
}

export const showErrors = (shouldShowErrors: boolean): ShowErrorsAction => {
	return {
		type: SHOW_ERRORS,
		payload: shouldShowErrors
	};
};

/**
 * Complex route may be as round-trip. Checking it
 *
 * @param {ApplicationState} state
 * @return {boolean}
 */
const isSearchRT = (state: ApplicationState): boolean => {
	const form = state.form;

	return form.routeType === RouteType.RT ||
		(
			form.routeType === RouteType.CR &&
			form.segments.length === SEGMENTS_COUNT_RT &&
			form.segments[0].autocomplete.arrival.airport.IATA === form.segments[1].autocomplete.departure.airport.IATA &&
			form.segments[0].autocomplete.departure.airport.IATA === form.segments[1].autocomplete.arrival.airport.IATA
		);
};

const nemoFastSearchSegment = (segment: SegmentState): string => {
	let request = '';

	request += segment.autocomplete.departure.airport.isCity ? 'c' : 'a';
	request += segment.autocomplete.departure.airport.IATA;

	// Arrival airport info.
	request += segment.autocomplete.arrival.airport.isCity ? 'c' : 'a';
	request += segment.autocomplete.arrival.airport.IATA;

	// Departure date info.
	request += segment.departureDate.date.format('YYYYMMDD');

	return request;
};

const runNemoSearch = (state: ApplicationState): void => {
	let requestURL = clearURL(state.system.nemoURL) + '/results/';
	const segments = state.form.segments;

	requestURL += nemoFastSearchSegment(segments[0]);

	if (segments.length >= SEGMENTS_COUNT_RT) {
		if (isSearchRT(state)) {
			// Return date info
			requestURL += segments[1].departureDate.date.format('YYYYMMDD');
		}
		else if (state.form.routeType === RouteType.CR) {
			segments.forEach((segment, index) => {
				requestURL += index > 0 ? nemoFastSearchSegment(segment) : '';
			});
		}
	}

	// Passengers info.
	for (const passType in state.form.passengers) {
		if (state.form.passengers.hasOwnProperty(passType) && state.form.passengers[passType].count) {
			const passConfig: PassengerState = state.form.passengers[passType];

			requestURL += `${passConfig.code}${passConfig.count}`;
		}
	}

	// Class info.
	requestURL += '-class=' + state.form.additional.classType;

	// VicinityDates
	if (state.form.additional.vicinityDates && segments.length === 1) {
		requestURL += `-vicinityDates=${state.system.vicinityDays}`;
	}

	// Direct flight
	if (state.form.additional.directFlight) {
		requestURL += '-direct';
	}

	document.location.href = URL(requestURL, {
		changelang: state.system.locale
	});
};

const runWebskySearch = (): void => {
	const form = document.getElementById('webskyHiddenForm') as HTMLFormElement;

	if (form) {
		form.submit();
	}
};

const createSearchInfo = (state: ApplicationState): SearchInfo => {
	let segments = state.form.segments.map((segment: SegmentState): SearchInfoSegment => {
		return {
			departure: {
				IATA: segment.autocomplete.departure.airport.IATA,
				isCity: !!segment.autocomplete.departure.airport.isCity
			},
			arrival: {
				IATA: segment.autocomplete.arrival.airport.IATA,
				isCity: !!segment.autocomplete.arrival.airport.isCity
			},
			departureDate: segment.departureDate.date.format()
		};
	});

	if (state.form.routeType === RouteType.OW) {
		segments = segments.slice(0, 1);
	}
	else if (state.form.routeType === RouteType.RT) {
		segments = segments.slice(0, SEGMENTS_COUNT_RT);
	}

	const passengers: SearchInfoPassenger[] = [];

	for (const passType in state.form.passengers) {
		if (state.form.passengers.hasOwnProperty(passType)) {
			passengers.push({
				type: state.form.passengers[passType].code,
				count: state.form.passengers[passType].count
			});
		}
	}

	return {
		segments,
		passengers,
		routeType: state.form.routeType,
		serviceClass: state.form.additional.classType
	};
};

/**
 * Starting search:
 * - run validation
 * - do some optional checks
 * - run search itself
 *
 * @param onSearch
 */
export const startSearch = (onSearch?: OnSearchFunction): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const state = getState();

		if (formIsValid(state)) {
			if (typeof onSearch === 'function') {
				onSearch(createSearchInfo(state));
			}
			else if (state.system.mode === ApplicationMode.NEMO) {
				runNemoSearch(state);
			}
			else if (state.system.mode === ApplicationMode.WEBSKY) {
				runWebskySearch();
			}
		}
		else {
			dispatch(showErrors(true));
		}
	};
};
