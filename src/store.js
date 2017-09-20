import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import { cache } from 'utils';
import { initialState, systemState, autocompleteState } from 'state';
import { configReducer } from 'reducers/system';
import { autocompleteReducer, autocompleteInputValueReducer, autocompleteAirportReducer } from 'reducers/form/autocomplete';

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
	const cachedState = cache(STORE_CACHE_KEY);
	return cachedState ? cachedState : {};
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
 * @param {Object} config - system configuration object.
 *
 * @returns {Store}
 */
export function getStore(config = {}) {
	// State object that has been stored in `localStorage` in the past.
	const stateFromCache = getPreloadedState();
	
	// New state object that will be used as the initial state for the new redux-store.
	let preloadedState = {
		...initialState,
		system: configReducer(systemState, config)
	};
	
	// Let's fill `preloadedState` with data from `stateFromCache`.
	// -------------------------------------------------------------------------------------
	// Disclaimer: this bullshit below can be avoided with use of `lodash` or `underscore`, 
	// but those libraries are not lightweight enough for us.
	if (stateFromCache) {
		// Check if language has been changed since last user visit.
		// If so, do not process cached airport information, because the cached data most likely is in the different language.
		const canBeProcessed = stateFromCache.system.locale === preloadedState.system.locale;
		const cachedDepartureAutocomplete = stateFromCache.form.autocomplete.departure;
		const cachedArrivalAutocomplete = stateFromCache.form.autocomplete.arrival;
		
		if (canBeProcessed && cachedDepartureAutocomplete.airport) {
			preloadedState.form.autocomplete.departure = autocompleteInputValueReducer(
				preloadedState.form.autocomplete.departure,
				cachedDepartureAutocomplete.inputValue
			);

			preloadedState.form.autocomplete.departure = autocompleteAirportReducer(
				preloadedState.form.autocomplete.departure,
				cachedDepartureAutocomplete.airport
			);
		}

		if (canBeProcessed && cachedArrivalAutocomplete.airport) {
			preloadedState.form.autocomplete.arrival = autocompleteInputValueReducer(
				preloadedState.form.autocomplete.arrival,
				cachedArrivalAutocomplete.inputValue
			);

			preloadedState.form.autocomplete.arrival = autocompleteAirportReducer(
				preloadedState.form.autocomplete.arrival,
				cachedArrivalAutocomplete.airport
			);
		}
	}

	// Thunk middleware allows us to create functions instead of plain objects in action-creators (for async purposes).
	// @see https://github.com/gaearon/redux-thunk#motivation
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(...middlewares)
	);
}