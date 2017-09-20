import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import { cache } from 'utils';
import { initialState } from 'state';
import { processConfig } from 'reducers/system';

let middlewares = [thunk];

// Include redux-logger in development mode.
if (process.env.NODE_ENV !== 'production') {
	const logger = require('redux-logger').default;
	middlewares.push(logger);
}

const STORE_CACHE_KEY = 'cached_store';

/**
 * Get cached state object.
 */
export function getPreloadedState() {
	return cache(STORE_CACHE_KEY);
}

/**
 * Caching current state.
 * 
 * @param state
 */
export function setPreloadedState(state) {
	cache(STORE_CACHE_KEY, state);
}

/**
 * Create Redux-store.
 *
 * @returns {Store}
 */
export function getStore(config = {}) {
	// Thunk middleware allows us to create functions instead of plain objects in action-creators (for async purposes).
	// @see https://github.com/gaearon/redux-thunk#motivation
	let preloadedState = {
		...initialState,
		system: processConfig(initialState, config)
	};

	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(...middlewares)
	);
}