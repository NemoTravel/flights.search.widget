import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import { Provider } from 'react-redux';
import { getStore } from 'store';
import { loadConfig } from 'actions/system';
import './css/main.scss';

/**
 * This will be exported to the global scope as `AirlinesSearchWidget.init`.
 */
export function init(config = {}) {
	if (!config.rootElement) { throw Error('Please specify `rootElement` parameter in the configuration object.'); }
	if (!config.API_URL) { throw Error('Please specify `API_URL` parameter in the configuration object.'); }
	
	const store = getStore();

	// Load initial config.
	store.dispatch(loadConfig(config));

	ReactDOM.render(
		<Provider store={store}>
			<Main/>
		</Provider>,
		config.rootElement
	);
}