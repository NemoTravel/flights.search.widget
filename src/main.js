import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import WidgetComponent from 'components/Widget';
import { Provider } from 'react-redux';
import { getStore, cacheState } from 'store';
import './css/main.scss';
import 'whatwg-fetch';

export const Widget = WidgetComponent;

/**
 * This will be exported to the global scope as `AirlinesSearchWidget.init`.
 */
export function init(config = {}) {
	if (!config.rootElement) { throw Error('Please specify `rootElement` parameter in the configuration object.'); }
	if (!config.baseURL) { throw Error('Please specify `baseURL` parameter in the configuration object.'); }
	
	const store = getStore(config);

	ReactDOM.render(
		<Provider store={store}>
			<Main/>
		</Provider>,
		config.rootElement
	);

	// Subscribe to new state updates and cache new state.
	store.subscribe(() => cacheState(store.getState()));
}