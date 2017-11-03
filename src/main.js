import 'ponyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import DemoForm from 'components/Demo';
import { Provider } from 'react-redux';
import { getStore, cacheState } from 'store';
import './css/main.scss';
import 'whatwg-fetch';

/**
 * This will be exported to the global scope as `FlightsSearchWidget.init`.
 */
export const init = (config = {}) => {
	if (!config.rootElement) {
		throw Error('Please specify `rootElement` parameter in the configuration object.');
	}

	if (!config.nemoURL) {
		throw Error('Please specify `nemoURL` parameter in the configuration object.');
	}

	const store = getStore(config);

	ReactDOM.render(
		<Provider store={store}>
			<Main/>
		</Provider>,
		config.rootElement
	);

	// Subscribe to new state updates and cache new state.
	store.subscribe(() => cacheState(store.getState()));
};

export const initDemo = () => {
	ReactDOM.render(
		<DemoForm/>,
		document.getElementById('root')
	);
};
