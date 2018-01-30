import { autocompleteAirportReducer, autocompleteGroupsReducer } from './store/form/autocomplete/reducer';
import { selectDateReducer, toggleDatepickerReducer, setAvailableDatesReducer } from './store/form/dates/reducer';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ThunkAction } from 'redux-thunk';

export const MODE_NEMO = 'NEMO';
export const MODE_WEBSKY = 'WEBSKY';
export const CLASS_TYPES = ['Economy', 'Business'];

export enum ApplicationMode {
	NEMO = 'NEMO',
	WEBSKY = 'WEBSKY'
}

export enum ServiceClass {
	Economy = 'Economy',
	Business = 'Business'
}

export enum Language {
	English = 'en',
	Russian = 'ru',
	Romanian = 'ro',
	German = 'de'
}

export enum PassengerType {
	Adult = 'ADT',
	Child = 'CLD',
	Infant = 'INF',
	InfantWithSeat = 'INS'
}

interface PassengersConfig {
	[passengerType: string]: number;
}

export type CommonThunkAction = ThunkAction<void, ApplicationState, null>;

export type GetStateFunction = () => ApplicationState;

export interface SystemState {
	rootElement?: HTMLElement;
	nemoURL?: string;
	webskyURL?: string;
	routingGrid?: string;
	locale?: Language;
	verticalForm?: boolean;
	readOnlyAutocomplete?: boolean;
	autoFocusArrivalAirport?: boolean;
	autoFocusReturnDate?: boolean;
	mode?: ApplicationMode;
	defaultDepartureAirport?: string | any;
	defaultArrivalAirport?: string | any;
	defaultDepartureDate?: string;
	defaultReturnDate?: string;
	defaultPassengers?: PassengersConfig;
	defaultServiceClass?: ServiceClass;
	directOnly?: boolean;
	vicinityDatesMode?: boolean;
	useNearestAirport?: boolean;
	highlightAvailableDates?: boolean;
	vicinityDays?: number;
	enableCoupon?: boolean;
	enableMileCard?: boolean;
	aggregationOnly?: boolean;
}

export const systemState: SystemState = {
	rootElement: null,
	webskyURL: '',
	nemoURL: '',
	routingGrid: null,
	locale: Language.English,
	verticalForm: false,
	readOnlyAutocomplete: false,
	autoFocusArrivalAirport: false,
	autoFocusReturnDate: false,
	mode: ApplicationMode.NEMO,
	defaultDepartureAirport: null,
	defaultArrivalAirport: null,
	defaultDepartureDate: null,
	defaultReturnDate: null,
	defaultPassengers: { ADT: 1 },
	defaultServiceClass: ServiceClass.Economy,
	directOnly: false,
	vicinityDatesMode: false,
	useNearestAirport: false,
	highlightAvailableDates: false,
	vicinityDays: 3,
	enableCoupon: false,
	enableMileCard: false,
	aggregationOnly: false
};

// ---------------------------------------------------------------------------------------------------------------------

export enum AutocompleteFieldType {
	Departure = 'departure',
	Arrival = 'arrival',
	DefaultGroups = 'defaultGroups'
}

export interface AutocompleteGroupState {
	options: any;
	className: string;
	name: string;
}

export interface AutocompleteFieldState {
	isLoading: boolean;
	suggestions: any;
	airport: any;
}

export interface AutocompleteState {
	departure: AutocompleteFieldState;
	arrival: AutocompleteFieldState;
	defaultGroups: {
		[groupName: string]: AutocompleteGroupState;
	};
}

export const autocompleteState: AutocompleteState = {
	[AutocompleteFieldType.Departure]: {
		isLoading: false,
		suggestions: [],
		airport: null
	},
	[AutocompleteFieldType.Arrival]: {
		isLoading: false,
		suggestions: [],
		airport: null
	},
	defaultGroups: {
		previousSearches: {
			options: {},
			className: 'widget-form-airports__suggestion__recently',
			name: 'previousSearches'
		}
	}
};

// ---------------------------------------------------------------------------------------------------------------------

export enum DatepickerFieldType {
	Departure = 'departure',
	Return = 'return'
}

export interface DatepickerState {
	isActive: boolean;
	date?: Moment;
	availableDates: any;
}

export interface CachedDatepickerState {
	isActive: boolean;
	date?: string;
	availableDates: any;
}

export interface DatesState {
	departure: DatepickerState;
	return: DatepickerState;
}

export interface CachedDatesState {
	departure: CachedDatepickerState;
	return: CachedDatepickerState;
}

export const datesState: DatesState = {
	[DatepickerFieldType.Departure]: {
		isActive: true,
		date: null,
		availableDates: []
	},
	[DatepickerFieldType.Return]: {
		isActive: false,
		date: null,
		availableDates: []
	}
};

// ---------------------------------------------------------------------------------------------------------------------

export interface PassengerState {
	title: string;
	ageTitle: string;
	code: PassengerType;
	count: number;
}

export interface PassengersState {
	[passengerType: string]: PassengerState;
}

export const passengersState: PassengersState = {
	ADT: {
		title: 'passenger_ADT',
		ageTitle: 'passenger_ADT_age',
		code: PassengerType.Adult,
		count: 0
	},
	CLD: {
		title: 'passenger_CLD',
		ageTitle: 'passenger_CLD_age',
		code: PassengerType.Child,
		count: 0
	},
	INF: {
		title: 'passenger_INF',
		ageTitle: 'passenger_INF_age',
		code: PassengerType.Infant,
		count: 0
	},
	INS: {
		title: 'passenger_INS',
		ageTitle: 'passenger_INS_age',
		code: PassengerType.InfantWithSeat,
		count: 0
	}
};

// ---------------------------------------------------------------------------------------------------------------------

export interface AdditionalState {
	classType: ServiceClass;
	vicinityDates: number;
	directFlight: boolean;
}

export const additionalState: AdditionalState = {
	classType: ServiceClass.Economy,
	vicinityDates: 0,
	directFlight: false
};

// ---------------------------------------------------------------------------------------------------------------------

export interface CouponState {
	isActive: boolean;
	number: string;
}

export const couponState: CouponState = {
	isActive: false,
	number: null
};

// ---------------------------------------------------------------------------------------------------------------------

export interface MileCardState {
	isActive: boolean;
	number: string;
	password: string;
}

export const mileCardState: MileCardState = {
	isActive: false,
	number: null,
	password: null
};

// ---------------------------------------------------------------------------------------------------------------------

export interface FormState {
	dates: DatesState;
	passengers: PassengersState;
	autocomplete: AutocompleteState;
	additional: AdditionalState;
	coupon: CouponState;
	mileCard: MileCardState;
}

export interface CachedFormSate {
	dates: CachedDatesState;
	passengers: PassengersState;
	autocomplete: AutocompleteState;
	additional: AdditionalState;
	coupon: CouponState;
	mileCard: MileCardState;
}

export interface ApplicationState {
	system: SystemState;
	form: FormState;
}

export interface ApplicationCachedState {
	system: SystemState;
	form: CachedFormSate;
}

export const initialState: ApplicationState = {
	system: systemState,
	form: {
		dates: datesState,
		passengers: passengersState,
		autocomplete: autocompleteState,
		additional: additionalState,
		coupon: couponState,
		mileCard: mileCardState
	}
};

export const fillStateFromCache = (currentState: ApplicationState, stateFromCache?: ApplicationCachedState): ApplicationState => {
	const state = currentState;

	// Let's fill `state` with data from `stateFromCache`.
	// -------------------------------------------------------------------------------------
	// Disclaimer: this bullshit below can be avoided with use of `lodash` or `underscore`,
	// but those libraries are not lightweight enough for us.
	if (stateFromCache) {
		// Check if language has been changed since last user visit.
		// If so, do not process cached airport information, because the cached data most likely is in the different language.
		const canBeProcessed = !stateFromCache.system || !stateFromCache.system.locale || stateFromCache.system.locale === state.system.locale;

		if (stateFromCache.form) {
			if (stateFromCache.form.autocomplete) {
				const cachedDepartureAutocomplete = stateFromCache.form.autocomplete.departure;
				const cachedArrivalAutocomplete = stateFromCache.form.autocomplete.arrival;
				const cachedAutocompleteGroups = stateFromCache.form.autocomplete.defaultGroups;

				if (canBeProcessed && cachedDepartureAutocomplete && cachedDepartureAutocomplete.airport) {
					state.form.autocomplete.departure = autocompleteAirportReducer(
						state.form.autocomplete.departure,
						cachedDepartureAutocomplete.airport
					);
				}

				if (canBeProcessed && cachedArrivalAutocomplete && cachedArrivalAutocomplete.airport) {
					state.form.autocomplete.arrival = autocompleteAirportReducer(
						state.form.autocomplete.arrival,
						cachedArrivalAutocomplete.airport
					);
				}

				if (canBeProcessed && cachedAutocompleteGroups && cachedAutocompleteGroups.previousSearches) {
					state.form.autocomplete.defaultGroups = autocompleteGroupsReducer(
						state.form.autocomplete.defaultGroups,
						cachedAutocompleteGroups.previousSearches
					);
				}
			}

			if (stateFromCache.form.dates) {
				const cachedDepartureDate = stateFromCache.form.dates.departure;
				const cachedReturnDate = stateFromCache.form.dates.return;
				const today = moment().startOf('day');

				if (cachedDepartureDate) {
					if (cachedDepartureDate.date) {
						const newDepartureDate = moment(cachedDepartureDate.date).locale(state.system.locale);

						if (newDepartureDate.isSameOrAfter(today)) {
							state.form.dates.departure = selectDateReducer(cachedDepartureDate, newDepartureDate);
						}
					}

					if (cachedDepartureDate.availableDates instanceof Array && cachedDepartureDate.availableDates.length) {
						state.form.dates.departure = setAvailableDatesReducer(state.form.dates.departure, cachedDepartureDate.availableDates);
					}
				}

				if (cachedReturnDate) {
					if (cachedReturnDate.date) {
						const newReturnDate = moment(cachedReturnDate.date).locale(state.system.locale);

						if (newReturnDate.isSameOrAfter(today)) {
							state.form.dates.return = toggleDatepickerReducer(cachedReturnDate, true);
							state.form.dates.return = selectDateReducer(state.form.dates.return, newReturnDate);
						}
					}

					if (cachedReturnDate.availableDates instanceof Array && cachedReturnDate.availableDates.length) {
						state.form.dates.return = setAvailableDatesReducer(state.form.dates.return, cachedReturnDate.availableDates);
					}
				}
			}

			if (stateFromCache.form.passengers) {
				for (const passType in stateFromCache.form.passengers) {
					if (stateFromCache.form.passengers.hasOwnProperty(passType)) {
						state.form.passengers[passType].count = stateFromCache.form.passengers[passType].count;
					}
				}
			}

			if (stateFromCache.form.additional) {
				if (stateFromCache.form.additional.classType) {
					state.form.additional.classType = stateFromCache.form.additional.classType;
				}

				if (stateFromCache.form.additional.vicinityDates) {
					state.form.additional.vicinityDates = stateFromCache.form.additional.vicinityDates;
				}

				if (stateFromCache.form.additional.directFlight) {
					state.form.additional.directFlight = stateFromCache.form.additional.directFlight;
				}
			}

			if (stateFromCache.form.coupon) {
				const cachedCouponIsActive = stateFromCache.form.coupon.isActive;
				const cachedCouponNumber = stateFromCache.form.coupon.number;

				if (cachedCouponIsActive) {
					state.form.coupon.isActive = cachedCouponIsActive;
				}
				if (cachedCouponNumber) {
					state.form.coupon.number = cachedCouponNumber;
				}
			}

			if (stateFromCache.form.mileCard) {
				const cachedMileCardIsActive = stateFromCache.form.mileCard.isActive;
				const cachedMileCardNumber = stateFromCache.form.mileCard.number;
				const cachedMileCardPassword = stateFromCache.form.mileCard.password;

				if (cachedMileCardIsActive) {
					state.form.mileCard.isActive = cachedMileCardIsActive;
				}

				if (cachedMileCardNumber) {
					state.form.mileCard.number = cachedMileCardNumber;
				}

				if (cachedMileCardPassword) {
					state.form.mileCard.password = cachedMileCardPassword;
				}
			}
		}
	}

	return state;
};
