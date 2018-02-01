import './ponyfills';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './components/Main';
import DemoForm from './components/Demo';
import { Provider } from 'react-redux';
import { getStore, cacheState } from './store';
import './css/main.scss';
import './css/nemo/main.scss';
import 'whatwg-fetch';
import { SystemState } from './state';

/**
 * This will be exported to the global scope as `FlightsSearchWidget.init`.
 *
 * @param {SystemState} config
 */
export const init = (config: SystemState) => {
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
