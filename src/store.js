import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import { switchAirports } from 'middlewares';

let middlewares = [thunk, switchAirports];

// Include redux-logger in development mode.
if (process.env.NODE_ENV !== 'production') {
	const logger = require('redux-logger').default;
	middlewares.push(logger);
}

/**
 * Create Redux-store.
 *
 * @returns {Store}
 */
export function getStore() {
	// Thunk middleware allows us to create functions instead of plain objects in action-creators (for async purposes).
	// @see https://github.com/gaearon/redux-thunk#motivation

	return createStore(
		rootReducer,
		applyMiddleware(...middlewares)
	);
}