import { autocompleteInputValueReducer, autocompleteAirportReducer } from 'reducers/form/autocomplete';
import { selectDateReducer, toggleDatepickerReducer } from 'reducers/form/dates';
import { setPassengersCounterReducer } from 'reducers/form/passengers';
import moment from 'moment';
import { i18n } from 'utils';

export const systemState = {
	rootElement: null,
	API_URL: '',
	routingGrid: null,
	locale: 'en',
	showAirportIATA: false,
	readOnlyAutocomplete: false,
	enableInfantsWithSeats: false
};

export const blockVisibilityState = {
	search: true,
	registration: false,
	bookings: false
};

export const autocompleteState = {
	departure: {
		isLoading: false,
		suggestions: [],
		inputValue: '',
		airport: null
	},
	arrival: {
		isLoading: false,
		suggestions: [],
		inputValue: '',
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
		title: i18n('form', 'passenger_ADT'),
		code: 'ADT',
		count: 1
	},
	CLD: {
		title: i18n('form', 'passenger_CLD'),
		code: 'CLD',
		count: 0
	},
	INF: {
		title: i18n('form', 'passenger_INF'),
		code: 'INF',
		count: 0
	},
	INS: {
		title: i18n('form', 'passenger_INS'),
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
					state.form.autocomplete.departure = autocompleteInputValueReducer(
						state.form.autocomplete.departure,
						cachedDepartureAutocomplete.inputValue
					);

					state.form.autocomplete.departure = autocompleteAirportReducer(
						state.form.autocomplete.departure,
						cachedDepartureAutocomplete.airport
					);
				}

				if (canBeProcessed && cachedArrivalAutocomplete && cachedArrivalAutocomplete.airport) {
					state.form.autocomplete.arrival = autocompleteInputValueReducer(
						state.form.autocomplete.arrival,
						cachedArrivalAutocomplete.inputValue
					);

					state.form.autocomplete.arrival = autocompleteAirportReducer(
						state.form.autocomplete.arrival,
						cachedArrivalAutocomplete.airport
					);
				}
			}
			
			if (stateFromCache.form.dates) {
				const cachedDepartureDate = stateFromCache.form.dates.departure;
				const cachedReturnDate = stateFromCache.form.dates.return;

				if (cachedDepartureDate && cachedDepartureDate.date) {
					state.form.dates.departure = selectDateReducer(cachedDepartureDate, moment(cachedDepartureDate.date));
				}

				if (cachedReturnDate && cachedReturnDate.date) {
					state.form.dates.return = toggleDatepickerReducer(cachedReturnDate, true);
					state.form.dates.return = selectDateReducer(cachedReturnDate, moment(cachedReturnDate.date));
				}
			}

			if (stateFromCache.form.passengers) {
				for (const passType in stateFromCache.form.passengers) {
					if (stateFromCache.form.passengers.hasOwnProperty(passType)) {
						const counter = stateFromCache.form.passengers[passType].count;
						state.form.passengers[passType] = setPassengersCounterReducer(stateFromCache.form.passengers[passType], counter);
					}
				}
			}
		}
	}
	
	return state;
};