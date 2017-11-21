import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'store/reducer';
import * as Cache from 'cache';
import moment from 'moment';
import { initialState, systemState, fillStateFromCache } from 'state';
import { configReducer } from 'store/system/reducer';
import { loadAirportForAutocomplete, loadNearestAirportForAutocomplete, setSelectedAirport } from 'store/form/autocomplete/actions';
import { selectDate } from 'store/form/dates/actions';
import { setClassType, setVicinityDatesCheckbox } from 'store/form/additional/actions';
import { getTotalPassengersCount } from 'store/form/passengers/selectors';
import { setCounter } from 'store/form/passengers/actions';

const middlewares = [thunk];

const enableProfiler = (isEnabled = false) => {
	if (isEnabled) {
		const { whyDidYouUpdate } = require('@nemo.travel/why-did-you-update');

		whyDidYouUpdate(React);
	}
};

const enableReduxLogger = (isEnabled = false) => {
	if (isEnabled) {
		const logger = require('redux-logger').default;

		middlewares.push(logger);
	}
};

/* global process */
if (process.env.NODE_ENV !== 'production') {
	enableReduxLogger(true);
	enableProfiler(false);
}

const STORE_CACHE_KEY = 'cached_store';

/**
 * Get cached state object.
 */
export const getCachedState = () => {
	const cachedState = Cache.get(STORE_CACHE_KEY + '_' + process.env.VERSION);

	return cachedState ? cachedState : {};
};

/**
 * Caching current state.
 *
 * @param state
 */
export const cacheState = state => {
	Cache.set(STORE_CACHE_KEY + '_' + process.env.VERSION, state);
};

/**
 * Create Redux-store.
 *
 * @param {Object} config - system configuration object.
 *
 * @returns {Store}
 */
export const getStore = (config = {}) => {
	// State object that has been stored in `localStorage` in the past.
	const stateFromCache = getCachedState();

	// New state object that will be used as the initial state for the new redux-store.
	let preloadedState = {
		...initialState,
		system: configReducer(systemState, config)
	};

	preloadedState = fillStateFromCache(preloadedState, stateFromCache);

	// Thunk middleware allows us to create functions instead of plain objects in action-creators (for async purposes).
	// @see https://github.com/gaearon/redux-thunk#motivation
	const store = createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(...middlewares)
	);

	const state = store.getState();

	if (!state.form.autocomplete.departure.airport) {
		// Pre-loading departure airport by specified IATA or airport object.
		if (state.system.defaultDepartureAirport) {
			if (typeof state.system.defaultDepartureAirport === 'string') {
				store.dispatch(loadAirportForAutocomplete(state.system.defaultDepartureAirport, 'departure'));
			}
			else if (typeof state.system.defaultDepartureAirport === 'object') {
				store.dispatch(setSelectedAirport(state.system.defaultDepartureAirport, 'departure'));
			}
		}

		// Pre-loading nearest airport (loaded by IP-address) as the departure airport.
		else if (state.system.useNearestAirport) {
			store.dispatch(loadNearestAirportForAutocomplete('departure'));
		}
	}

	if (!state.form.autocomplete.arrival.airport) {
		if (state.system.defaultArrivalAirport) {
			if (typeof state.system.defaultArrivalAirport === 'string') {
				store.dispatch(loadAirportForAutocomplete(state.system.defaultArrivalAirport, 'arrival'));
			}
			else if (typeof state.system.defaultArrivalAirport === 'object') {
				store.dispatch(setSelectedAirport(state.system.defaultArrivalAirport, 'arrival'));
			}
		}
	}

	if (!state.form.additional.classType) {
		store.dispatch(setClassType(state.system.defaultAdditionalOptions.classType));
	}

	if (state.form.additional.vicinityDates === null) {
		store.dispatch(setVicinityDatesCheckbox(state.system.defaultAdditionalOptions.vicinityDates));
	}

	if (!state.form.dates.departure.date) {
		if (state.system.defaultDates.departure) {
			let date = moment(state.system.defaultDates.departure).locale(state.system.locale);

			store.dispatch(selectDate(date, 'departure'));
		}
	}

	if (!state.form.dates.return.date) {
		if (state.system.defaultDates.return) {
			let date = moment(state.system.defaultDates.return).locale(state.system.locale);

			store.dispatch(selectDate(date, 'return'));
		}
	}

	if (getTotalPassengersCount(state) === 0) {
		let passengers = state.system.defaultPassengers;

		for (let type in passengers) {
			if (passengers.hasOwnProperty(type)) {
				store.dispatch(setCounter(passengers[type], type));
			}
		}
	}

	return store;
};
