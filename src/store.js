import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import { cache } from 'utils';
import { initialState, systemState, fillStateFromCache } from 'state';
import { configReducer } from 'reducers/system';

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
	const cachedState = cache(STORE_CACHE_KEY);
	return cachedState ? cachedState : {};
}

/**
 * Caching current state.
 * 
 * @param state
 */
export function cacheState(state) {
	cache(STORE_CACHE_KEY, state);
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
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(...middlewares)
	);
}