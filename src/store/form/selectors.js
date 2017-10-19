import { createSelector } from 'reselect';
import { getTotalPassengersCount } from 'store/form/passengers/selectors';
import { getAltLayout } from 'utils';

function getForm(state) {
	return state.form;
}

/**
 * Check if search form data is valid and ready for further operations.
 *
 * Checking for:
 * - valid departure and arrival airports
 * - valid departure date
 * - valid number of selected passengers
 */
export const formIsValid = createSelector(
	[ getForm, getTotalPassengersCount ],
	(form, totalPassengersCount) => {
		let isValid = true;

		if (totalPassengersCount <= 0) {
			isValid = false;
		}
		else if (!form.dates.departure.date) {
			isValid = false;
		}
		else if (!form.autocomplete.departure.airport) {
			isValid = false;
		}
		else if (!form.autocomplete.arrival.airport) {
			isValid = false;
		}
		else if (form.autocomplete.departure.airport.IATA === form.autocomplete.arrival.airport.IATA) {
			isValid = false;
		}

		return isValid;
	}
);

function getDepartureOptionsFromState(state) {
	return state.form.autocomplete.departure.suggestions;
}

function getArrivalOptionsFromState(state) {
	return state.form.autocomplete.arrival.suggestions;
}

function mapOptions(options) {
	return options
		.filter(option => option && option.airport && option.airport.name && option.airport.nameEn && option.airport.IATA)
		.map(option => {
			return {
				value: option,
				label: option.airport.name + option.airport.nameEn + option.airport.IATA + getAltLayout(option.airport.name)
			}
		});
}

/**
 * Create autocomplete options list for arrival and departure.
 */
export const getDepartureOptions = createSelector(getDepartureOptionsFromState, mapOptions);
export const getArrivalOptions = createSelector(getArrivalOptionsFromState, mapOptions);