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
import { ApplicationState, SystemState } from './state';
import { enableCaching } from './store/system/actions';
import { Store } from 'redux';

let storeGlobal: Store<ApplicationState>;

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

	storeGlobal = store;

	ReactDOM.render(
		<Provider store={store}>
			<Main/>
		</Provider>,
		config.rootElement
	);

	// Subscribe to new state updates and cache new state.
	store.subscribe(() => cacheState(store.getState()));
};

/**
 * Enable saving widget data in Local Storage if `disableCaching` disabled it
 */
export const enableCache = (): void => {
	storeGlobal.dispatch(enableCaching());
};

export const initDemo = () => {
	ReactDOM.render(
		<DemoForm/>,
		document.getElementById('root')
	);
};

export { default } from './components/Component';
