import { AnyAction, Dispatch } from 'redux';
import { SHOW_ERRORS } from '../actions';
import { formIsValid } from './selectors';
import { ApplicationMode, ApplicationState, CommonThunkAction, GetStateFunction } from '../../state';
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

const runNemoSearch = (state: ApplicationState): void => {
	let requestURL = clearURL(state.system.nemoURL) + '/results/';

	// Departure airport info.
	requestURL += state.form.autocomplete.departure.airport.isCity ? 'c' : 'a';
	requestURL += state.form.autocomplete.departure.airport.IATA;

	// Arrival airport info.
	requestURL += state.form.autocomplete.arrival.airport.isCity ? 'c' : 'a';
	requestURL += state.form.autocomplete.arrival.airport.IATA;

	// Departure date info.
	requestURL += state.form.dates.departure.date.format('YYYYMMDD');

	// Return date info.
	if (state.form.dates.return.date) {
		requestURL += state.form.dates.return.date.format('YYYYMMDD');
	}

	// Passengers info.
	for (const passType in state.form.passengers) {
		if (state.form.passengers.hasOwnProperty(passType) && state.form.passengers[passType].count) {
			const passConfig = state.form.passengers[passType];

			requestURL += passConfig.code + passConfig.count;
		}
	}

	// Class info.
	requestURL += '-class=' + state.form.additional.classType;

	// VicinityDates
	if (state.form.additional.vicinityDates) {
		requestURL += '-vicinityDates=' + state.system.vicinityDays;
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

/**
 * Starting search:
 * - run validation
 * - do some optional checks
 * - run search itself
 */
export const startSearch = (): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const state = getState();

		if (formIsValid(state)) {
			if (state.system.mode === ApplicationMode.NEMO) {
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
