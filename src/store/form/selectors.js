import { createSelector } from 'reselect';
import { getTotalPassengersCount } from 'store/form/passengers/selectors';
import { getAltLayout, i18n } from 'utils';
import { autoCompleteSuggestionsFromCache } from 'state';

const getForm = state => state.form;

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

const getDepartureOptionsFromState = state => state.form.autocomplete.departure.suggestions;
const getArrivalOptionsFromState = state => state.form.autocomplete.arrival.suggestions;
const getDefauiltOptionsFromState = state => state.form.autocomplete.defaultGroups;
const mapOptions = options => {
	return options
		.filter(option => option && option.airport && option.airport.name && option.airport.nameEn && option.airport.IATA)
		.map(option => {
			return {
				value: option,
				label: option.airport.name + option.airport.nameEn + option.airport.IATA + getAltLayout(option.airport.name)
			};
		});
};

const mapGroupOptions = groups => {
	let groupsArray = [];

	for (let group in groups) {
		if (groups.hasOwnProperty(group)) {
			let optionsArray = [],
				options = groups[group].options;

			for (let option in options) {
				if (options.hasOwnProperty(option)) {
					optionsArray.push({ label: options[option].name, value: { airport: options[option] } });
				}
			}
			if (optionsArray.length) {
				groupsArray.push({
					label: i18n('form', groups[group].name),
					options: optionsArray,
					className: groups[group].className
				});
			}
		}
	}

	return groupsArray;
};

/**
 * Create autocomplete options list for arrival and departure.
 */
export const getDepartureOptions = createSelector(getDepartureOptionsFromState, mapOptions);
export const getArrivalOptions = createSelector(getArrivalOptionsFromState, mapOptions);
export const getDefaulsOptionsGroup = createSelector(getDefauiltOptionsFromState, mapGroupOptions);
