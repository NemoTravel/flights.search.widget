import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'store/reducer';
import * as Cache from 'cache';
import { initialState, systemState, fillStateFromCache } from 'state';
import { configReducer } from 'store/system/reducer';
import { loadAirportForAutocomplete, loadNearestAirportForAutocomplete } from 'store/form/autocomplete/actions';

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
	enableReduxLogger(false);
	enableProfiler(false);
}

const STORE_CACHE_KEY = 'cached_store';

/**
 * Get cached state object.
 */
export const getCachedState = () => {
	const cachedState = Cache.get(STORE_CACHE_KEY + '_' + Cache.getLocale() + '_' + process.env.VERSION);

	return cachedState ? cachedState : {};
};

/**
 * Caching current state.
 *
 * @param state
 */
export const cacheState = state => {
	Cache.set(STORE_CACHE_KEY + '_' + Cache.getLocale() + '_' + process.env.VERSION, state);
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
		// Pre-loading departure airport by specified IATA.
		if (state.system.defaultDepartureAirport) {
			store.dispatch(loadAirportForAutocomplete(state.system.defaultDepartureAirport, 'departure'));
		}

		// Pre-loading nearest airport (loaded by IP-address) as the departure airport.
		else if (state.system.useNearestAirport) {
			store.dispatch(loadNearestAirportForAutocomplete('departure'));
		}
	}

	return store;
};
