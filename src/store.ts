import * as React from 'react';
import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import * as moment from 'moment';

import * as Cache from './cache';
import rootReducer from './store/reducer';
import { setCounter } from './store/form/passengers/actions';
import { configReducer } from './store/system/reducer';
import { getTotalPassengersCount } from './store/form/passengers/selectors';
import {
	initialState, systemState, fillStateFromCache, ApplicationState, SystemState,
	AutocompleteFieldType, DatepickerFieldType, ApplicationCachedState, PassengerType
} from './state';
import { setClassType, setVicinityDatesCheckbox, setDirectFlightCheckbox } from './store/form/additional/actions';
import {
	loadAirportForAutocomplete,
	loadNearestAirportForAutocomplete,
	setSelectedAirport
} from './store/form/segments/autocomplete/actions';
import { addSegment } from './store/form/segments/actions';
import { selectDate } from './store/form/segments/dates/actions';

const middlewares = [thunk];
const STORE_CACHE_KEY = 'cached_store';

const enableProfiler = (isEnabled: boolean = false): void => {
	if (isEnabled) {
		const { whyDidYouUpdate } = require('@nemo.travel/why-did-you-update');

		whyDidYouUpdate(React);
	}
};

const enableReduxLogger = (isEnabled: boolean = false): void => {
	if (isEnabled) {
		const logger = require('redux-logger').default;

		middlewares.push(logger);
	}
};

/* global process */
if (process.env.NODE_ENV !== 'production') {
	enableReduxLogger(false);
	enableProfiler(false);
}

/**
 * Get cached state object.
 */
export const getCachedState = (): ApplicationCachedState => {
	const cachedState = Cache.get(`${STORE_CACHE_KEY}_${Cache.getLocale()}_${process.env.VERSION}`);

	return cachedState ? cachedState as ApplicationCachedState : null;
};

/**
 * Caching current state.
 *
 * @param state
 */
export const cacheState = (state: ApplicationState): void => {
	if (!state.system.disableCaching) {
		Cache.set(`${STORE_CACHE_KEY}_${Cache.getLocale()}_${process.env.VERSION}`, state);
	}
};

/**
 * Create Redux-store.
 *
 * @param {Object} config - system configuration object.
 *
 * @returns {Store}
 */
export const getStore = (config: SystemState): Store<ApplicationState> => {
	// State object that has been stored in `localStorage` in the past.
	const stateFromCache = !config.disableCaching ? getCachedState() : null;

	// New state object that will be used as the initial state for the new redux-store.
	let preloadedState = {
		...initialState,
		system: configReducer(systemState, config)
	};

	preloadedState = fillStateFromCache(preloadedState, stateFromCache);

	// Thunk middleware allows us to create functions instead of plain objects in action-creators (for async purposes).
	// @see https://github.com/gaearon/redux-thunk#motivation
	const store = createStore<ApplicationState>(
		rootReducer,
		preloadedState,
		applyMiddleware(...middlewares)
	);

	if (!store.getState().form.segments.length) {
		store.dispatch(addSegment());
	}

	const state = store.getState();

	if (!state.form.segments[0].autocomplete.departure.airport) {
		// Pre-loading departure airport by specified IATA or airport object.
		if (state.system.defaultDepartureAirport) {
			if (typeof state.system.defaultDepartureAirport === 'string') {
				store.dispatch(loadAirportForAutocomplete(state.system.defaultDepartureAirport, AutocompleteFieldType.Departure));
			}
			else if (typeof state.system.defaultDepartureAirport === 'object') {
				store.dispatch(setSelectedAirport(state.system.defaultDepartureAirport, AutocompleteFieldType.Departure));
			}
		}

		// Pre-loading nearest airport (loaded by IP-address) as the departure airport.
		else if (state.system.useNearestAirport) {
			store.dispatch(loadNearestAirportForAutocomplete(AutocompleteFieldType.Departure));
		}
	}

	if (!state.form.segments[0].autocomplete.arrival.airport) {
		if (state.system.defaultArrivalAirport) {
			if (typeof state.system.defaultArrivalAirport === 'string') {
				store.dispatch(loadAirportForAutocomplete(state.system.defaultArrivalAirport, AutocompleteFieldType.Arrival));
			}
			else if (typeof state.system.defaultArrivalAirport === 'object') {
				store.dispatch(setSelectedAirport(state.system.defaultArrivalAirport, AutocompleteFieldType.Arrival));
			}
		}
	}

	if (!state.form.additional.classType) {
		store.dispatch(setClassType(state.system.defaultServiceClass));
	}

	if (state.form.additional.vicinityDates === null) {
		store.dispatch(setVicinityDatesCheckbox(state.system.vicinityDatesMode));
	}

	if (state.form.additional.directFlight === null) {
		store.dispatch(setDirectFlightCheckbox(state.system.directOnly));
	}

	if (!state.form.segments[0].dates.return.date) {
		if (state.system.defaultReturnDate) {
			const returnDate = moment(state.system.defaultReturnDate).locale(state.system.locale);

			store.dispatch(selectDate(returnDate, DatepickerFieldType.Return, 0));
		}
	}

	if (!state.form.segments[0].dates.departure.date) {
		if (state.system.defaultDepartureDate) {
			const departureDate = moment(state.system.defaultDepartureDate).locale(state.system.locale);

			store.dispatch(selectDate(departureDate, DatepickerFieldType.Departure, 0));
		}
	}

	if (getTotalPassengersCount(state) === 0) {
		const passengers = state.system.defaultPassengers;

		for (const type in passengers) {
			if (passengers.hasOwnProperty(type)) {
				store.dispatch(setCounter(passengers[type], type as PassengerType));
			}
		}
	}

	return store;
};
