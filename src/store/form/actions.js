import { SHOW_ERRORS } from 'store/actions';
import { formIsValid } from 'store/form/selectors';
import { MODE_NEMO } from 'state';
import { URL, clearURL } from 'utils';
import { MODE_WEBSKY } from 'state';

export const showErrors = shouldShowErrors => {
	return {
		type: SHOW_ERRORS,
		payload: shouldShowErrors
	};
};

const runNemoSearch = state => {
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

	document.location = URL(requestURL, {
		changelang: state.system.locale
	});
};

const runWebskySearch = () => {
	const form = document.getElementById('webskyHiddenForm');

	if (form) {
		form.submit();
	}
};

/**
 * Starting search:
 * - run validation
 * - do some optional checks
 * - run search itself
 *
 * @returns {Object}
 */
export const startSearch = () => {
	return (dispatch, getState) => {
		const state = getState();

		if (formIsValid(state)) {
			if (state.system.mode === MODE_NEMO) {
				runNemoSearch(state);
			}
			else if (state.system.mode === MODE_WEBSKY) {
				runWebskySearch(state);
			}
		}
		else {
			dispatch(showErrors(true));
		}
	};
};