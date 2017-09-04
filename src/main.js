import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import { Provider } from 'react-redux';
import { getStore } from 'store';
import { loadConfig } from 'actions/system';
import styles from './css/main.scss';

/**
 * This will be exported to the global scope as `AirlinesSearchWidget.init`.
 */
export function init(config = {}) {
	const store = getStore();

	// Load initial config.
	store.dispatch(loadConfig(config));
	
	ReactDOM.render(
		<Provider store={store}>
			<Main />
		</Provider>,
		document.getElementById('root')
	);
}