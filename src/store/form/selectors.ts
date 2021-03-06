import { createSelector } from 'reselect';
import { getTotalPassengersCount } from './passengers/selectors';
import { getAltLayout, i18n } from '../../utils';
import {
	ApplicationMode, ApplicationState, AutocompleteDefaultGroupsState, AutocompleteFieldState,
	FormState, RouteType, SearchInfo, SearchInfoPassenger, SearchInfoSegment, SegmentState, SystemState
} from '../../state';
import { AutocompleteSuggestion } from '../../services/models/AutocompleteSuggestion';
import { AutocompleteOption } from '../../services/models/AutocompleteOption';

const getConfig = (state: ApplicationState): SystemState => state.system;

export const isWebsky = createSelector(
	[ getConfig ],
	(config: SystemState): boolean => config.mode === ApplicationMode.WEBSKY
);

export const showCouponField = createSelector(
	[ getConfig, isWebsky ],
	(config: SystemState, isWebskyMode: boolean): boolean => isWebskyMode && config.enableCoupon
);

export const showMileCardField = createSelector(
	[ getConfig, isWebsky ],
	(config: SystemState, isWebskyMode: boolean): boolean => isWebskyMode && config.enableMileCard && false // Disabled for now (feature is not implemented in Websky yet)
);

export const getForm = (state: ApplicationState): FormState => state.form;

export const isCR = createSelector(
	[ getForm ],
	(config: FormState): boolean => config.routeType === RouteType.CR
);

export const isRT = createSelector(
	[ getForm ],
	(config: FormState): boolean => config.routeType === RouteType.RT && config.segments.length > 1
);

export const getSearchInfo = createSelector(
	[ getForm ],
	(form: FormState): SearchInfo => {
		const segments = form.segments.map((segment: SegmentState): SearchInfoSegment => {
			return {
				departure: segment.autocomplete.departure.airport,
				arrival: segment.autocomplete.arrival.airport,
				departureDate: segment.departureDate.date
			};
		});

		const passengers: SearchInfoPassenger[] = [];

		for (const passType in form.passengers) {
			if (form.passengers.hasOwnProperty(passType)) {
				passengers.push({
					type: form.passengers[passType].code,
					count: form.passengers[passType].count
				});
			}
		}

		return {
			segments,
			passengers,
			routeType: form.routeType,
			serviceClass: form.additional.classType
		};
	}
);

const segmentIsValid = (segment: SegmentState): boolean => {
	let isValid = true;

	if (!segment.departureDate.date) {
		isValid = false;
	}
	else if (!segment.autocomplete.departure.airport) {
		isValid = false;
	}
	else if (!segment.autocomplete.arrival.airport) {
		isValid = false;
	}
	else if (segment.autocomplete.departure.airport.IATA === segment.autocomplete.arrival.airport.IATA) {
		isValid = false;
	}

	return isValid;
};

/**
 * Check if search form data is valid and ready for further operations.
 *
 * Checking for:
 * - valid departure and arrival airports
 * - valid departure date
 * - valid number of selected passengers
 */
export const formIsValid = createSelector(
	[ getForm, getTotalPassengersCount, isCR, isRT ],
	(form: FormState, totalPassengersCount: number, isCR: boolean, isRT: boolean): boolean => {
		let isValid = true;
		const segments = form.segments;

		if (!segments.length) {
			isValid = false;
		}
		else if (totalPassengersCount <= 0) {
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

		if (isValid) {
			if (isCR) {
				segments.forEach((segment, index) => {
					if(segmentIsValid(segment)) {
						if (index > 0 && segment.departureDate.date.isBefore(segments[index - 1].departureDate.date)) {
							isValid = false;
						}
					}
					else {
						isValid = false;
					}
				});
			}
			else {
				if (!segmentIsValid(segments[0])) {
					isValid = false;
				}
				if (isRT) {
					if (segments[1].departureDate.date && segments[1].departureDate.date.isBefore(segments[0].departureDate.date)) {
						isValid = false;
					}
				}
			}
		}

		return isValid;
	}
);

const getSuggestionsFromAutocomplete = (state: AutocompleteFieldState): AutocompleteSuggestion[] => state.suggestions;
const getDefaultOptionsFromState = (state: ApplicationState): AutocompleteDefaultGroupsState => state.form.segments[0].autocomplete.defaultGroups;

export const suggestionsToOptionsArray = (options: AutocompleteSuggestion[]): AutocompleteOption[] => {
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
export const getSuggestionOptions = createSelector(getSuggestionsFromAutocomplete, suggestionsToOptionsArray);
export const getDefaultOptionsGroup = createSelector(getDefaultOptionsFromState, mapGroupOptions);
