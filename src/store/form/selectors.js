import { createSelector } from 'reselect';
import { getTotalPassengersCount } from 'store/form/passengers/selectors';
import { getAltLayout, i18n } from 'utils';
import { MODE_WEBSKY } from '../../state';

const getConfig = state => state.system;

export const isWebsky = createSelector(
	[ getConfig ],
	config => config.mode === MODE_WEBSKY
);

export const showCouponField = createSelector(
	[ getConfig, isWebsky ],
	(config, isWebskyMode) => isWebskyMode && config.enableCoupon
);

export const showMileCardField = createSelector(
	[ getConfig, isWebsky ],
	(config, isWebskyMode) => false && isWebskyMode && config.enableMileCard // disabled for now (feature is not implemented in Websky yet)
);

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
		else if (form.coupon.number && !form.coupon.number.match(/^[\d]+$/g)) {
			isValid = false;
		}
		else if (
			form.mileCard.number && !form.mileCard.number.match(/^[\d]+$/g) ||
			form.mileCard.number && !form.mileCard.password ||
			form.mileCard.password && (!form.mileCard.number || !form.mileCard.number.match(/^[\d]+$/g))
		) {
			isValid = false;
		}

		return isValid;
	}
);

const getDepartureOptionsFromState = state => state.form.autocomplete.departure.suggestions;
const getArrivalOptionsFromState = state => state.form.autocomplete.arrival.suggestions;
const getDefaultOptionsFromState = state => state.form.autocomplete.defaultGroups;
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
	const groupsArray = [];

	for (const group in groups) {
		if (groups.hasOwnProperty(group)) {
			const
				optionsArray = [],
				options = groups[group].options;

			for (const option in options) {
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
export const getDefaultOptionsGroup = createSelector(getDefaultOptionsFromState, mapGroupOptions);
