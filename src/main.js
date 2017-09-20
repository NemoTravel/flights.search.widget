import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import { Provider } from 'react-redux';
import { getStore, setPreloadedState, getPreloadedState } from 'store';
import { loadConfig } from 'actions/system';
import { processInitialState } from 'actions/system';
import './css/main.scss';

/**
 * This will be exported to the global scope as `AirlinesSearchWidget.init`.
 */
export function init(config = {}) {
	if (!config.rootElement) { throw Error('Please specify `rootElement` parameter in the configuration object.'); }
	if (!config.API_URL) { throw Error('Please specify `API_URL` parameter in the configuration object.'); }
	
	const store = getStore(config);
	const preloadedState = getPreloadedState();

	ReactDOM.render(
		<Provider store={store}>
			<Main/>
		</Provider>,
		config.rootElement
	);

	// Load initial state object.
	store.dispatch(processInitialState(preloadedState));

	// Subscribe to new state updates and cache new state.
	store.subscribe(() => setPreloadedState(store.getState()));
}