import { createSelector } from 'reselect';
import { getTotalPassengersCount } from './passengers/selectors';
import { getAltLayout, i18n } from '../../utils';
import {
	ApplicationMode, ApplicationState, AutocompleteDefaultGroupsState,
	FormState,
	SystemState
} from '../../state';
import { AutocompleteSuggestion } from '../../services/models/AutocompleteSuggestion';
import { AutocompleteOption } from '../../services/models/AutocompleteOption';
import {create} from "domain";

const getConfig = (state: ApplicationState): SystemState => state.system;

export const isWebsky = createSelector(
	[ getConfig ],
	(config: SystemState): boolean => config.mode === ApplicationMode.WEBSKY
);

export const showCouponField = createSelector(
	[ getConfig, isWebsky ],
	(config: SystemState, isWebskyMode: boolean): boolean => isWebskyMode && config.enableCoupon
);

export const routeType = createSelector(
	[ getConfig ],
	(config: SystemState): boolean => config.isComplexRoute
);

export const showMileCardField = createSelector(
	[ getConfig, isWebsky ],
	(config: SystemState, isWebskyMode: boolean): boolean => isWebskyMode && config.enableMileCard && false // Disabled for now (feature is not implemented in Websky yet)
);

const getForm = (state: ApplicationState): FormState => state.form;

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
	(form: FormState, totalPassengersCount: number): boolean => {
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

const getDepartureOptionsFromState = (state: ApplicationState): AutocompleteSuggestion[] => state.form.autocomplete.departure.suggestions;
const getArrivalOptionsFromState = (state: ApplicationState): AutocompleteSuggestion[] => state.form.autocomplete.arrival.suggestions;
const getDefaultOptionsFromState = (state: ApplicationState): AutocompleteDefaultGroupsState => state.form.autocomplete.defaultGroups;

const mapOptions = (options: AutocompleteSuggestion[]): AutocompleteOption[] => {
	return options
		.filter(option => option && option.airport && option.airport.name && option.airport.nameEn && option.airport.IATA)
		.map((option): AutocompleteOption => {
			return {
				value: option,
				label: option.airport.name + option.airport.nameEn + option.airport.IATA + getAltLayout(option.airport.name)
			};
		});
};

export interface DefaultOptionGroup {
	label: string;
	options: any[];
	className: string;
}

const mapGroupOptions = (groups: AutocompleteDefaultGroupsState): DefaultOptionGroup[] => {
	const groupsArray: DefaultOptionGroup[] = [];

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
