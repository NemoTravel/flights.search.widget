import { autocompleteAirportReducer } from 'reducers/form/autocomplete';
import { selectDateReducer, toggleDatepickerReducer } from 'reducers/form/dates';
import moment from 'moment';

export const MODE_NEMO = 'NEMO';
export const MODE_WEBSKY = 'WEBSKY';

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
	mode: MODE_NEMO
};

// export const blockVisibilityState = {
// 	search: true,
// 	registration: false,
// 	bookings: false
// };

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
		date: null
	},
	'return': {
		isActive: false,
		date: null
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

export const initialState = {
	system: systemState,
	form: {
		dates: datesState,
		passengers: passengersState,
		autocomplete: autocompleteState
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

				if (cachedDepartureDate && cachedDepartureDate.date) {
					const newDepartureDate = moment(cachedDepartureDate.date).locale(state.system.locale);
					
					if (newDepartureDate.isSameOrAfter(today)) {
						state.form.dates.departure = selectDateReducer(cachedDepartureDate, newDepartureDate);
					}
				}

				if (cachedReturnDate && cachedReturnDate.date) {
					const newReturnDate = moment(cachedReturnDate.date).locale(state.system.locale);
					
					if (newReturnDate.isSameOrAfter(today)) {
						state.form.dates.return = toggleDatepickerReducer(cachedReturnDate, true);
						state.form.dates.return = selectDateReducer(cachedReturnDate, newReturnDate);
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