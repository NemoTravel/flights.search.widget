import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import { Provider } from 'react-redux';
import { getStore } from 'store';
import styles from './css/main.scss';

const store = getStore();

ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>, 
	document.getElementById('root')
);