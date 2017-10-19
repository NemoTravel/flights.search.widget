import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'store/reducer';
import * as Cache from 'cache';
import { initialState, systemState, fillStateFromCache } from 'state';
import { configReducer } from 'store/system/reducer';
import { loadAirportForAutocomplete, loadNearestAirportForAutocomplete } from 'store/form/autocomplete/actions';

let middlewares = [thunk];

function enableProfiler(isEnabled = false) {
	if (isEnabled) {
		/* eslint-disable-next-line no-unused-vars,react/no-deprecated */
		let createClass = React.createClass;

		Object.defineProperty(React, 'createClass', {
			set: (nextCreateClass) => {
				createClass = nextCreateClass;
			},
		});

		/* eslint-disable no-unused-vars */
		const {whyDidYouUpdate} = require('why-did-you-update');
		whyDidYouUpdate(React);
	}
}

function enableReduxLogger(isEnabled = false) {
	if (isEnabled) {
		const logger = require('redux-logger').default;
		middlewares.push(logger);
	}
}

if (process.env.NODE_ENV !== 'production') {
	enableReduxLogger(false);
	enableProfiler(false);
}

const STORE_CACHE_KEY = 'cached_store';

/**
 * Get cached state object.
 */
export function getCachedState() {
	const cachedState = Cache.get(STORE_CACHE_KEY);
	return cachedState ? cachedState : {};
}

/**
 * Caching current state.
 * 
 * @param state
 */
export function cacheState(state) {
	Cache.set(STORE_CACHE_KEY, state);
}

/**
 * Create Redux-store.
 * 
 * @param {Object} config - system configuration object.
 *
 * @returns {Store}
 */
export function getStore(config = {}) {
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
}