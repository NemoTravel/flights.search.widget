import { autocompleteAirportReducer } from 'store/form/autocomplete/reducer';
import { selectDateReducer, toggleDatepickerReducer, setAvailableDatesReducer } from 'store/form/dates/reducer';
import moment from 'moment';

export const MODE_NEMO = 'NEMO';
export const MODE_WEBSKY = 'WEBSKY';
export const CLASS_TYPES = ["Econom", "Business", "First"];

export const systemState = {
	rootElement: null,
	webskyURL: '',
	nemoURL: '',
	routingGrid: null,
	locale: 'en',
	verticalForm: false,
	readOnlyAutocomplete: false,
	autoFocusArrivalAirport: false,
	autoFocusReturnDate: false,
	mode: MODE_NEMO,
	defaultDepartureAirport: null,
	useNearestAirport: false,
	highlightAvailableDates: false
};

// export const blockVisibilityState = {
// 	search: true,
// 	registration: false,
// 	bookings: false
// };

export const classType = 'first';

export const autocompleteState = {
	departure: {
		isLoading: false,
		suggestions: [],
		airport: null
	},
	arrival: {
		isLoading: false,
		suggestions: [],
		airport: null
	}
};

export const datesState = {
	'departure': {
		isActive: true,
		date: null,
		availableDates: []
	},
	'return': {
		isActive: false,
		date: null,
		availableDates: []
	}
};

export const passengersState = {
	ADT: {
		title: 'passenger_ADT',
		ageTitle: 'passenger_ADT_age',
		code: 'ADT',
		count: 1
	},
	CLD: {
		title: 'passenger_CLD',
		ageTitle: 'passenger_CLD_age',
		code: 'CLD',
		count: 0
	},
	INF: {
		title: 'passenger_INF',
		ageTitle: 'passenger_INF_age',
		code: 'INF',
		count: 0
	},
	INS: {
		title: 'passenger_INS',
		ageTitle: 'passenger_INS_age',
		code: 'INS',
		count: 0
	}
};

export const vicinityDates = false;

export const initialState = {
	system: systemState,
	form: {
		dates: datesState,
		passengers: passengersState,
		autocomplete: autocompleteState,
		classType: {
			classType: CLASS_TYPES[0],
			vicinityDates: vicinityDates
		}
	}
};

export const fillStateFromCache = (state, stateFromCache) => {
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
		}
	}
	
	return state;
};