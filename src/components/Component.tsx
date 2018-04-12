import * as React from 'react';
import { Provider } from 'react-redux';

import Main from './Main';
import { ApplicationState, SystemState } from '../state';
import { Store } from 'redux';
import { cacheState, getStore } from '../store';

class Component extends React.Component<SystemState> {
	protected store: Store<ApplicationState>;

	constructor(props: SystemState) {
		super(props);

		if (!props.nemoURL) {
			throw Error('Please specify `nemoURL` parameter in the configuration object.');
		}

		this.store = getStore(props);
		this.store.subscribe(() => cacheState(this.store.getState()));
	}

	render(): React.ReactNode {
		return (
			<Provider store={this.store}>
				<Main/>
			</Provider>
		);
	}
}

export default Component;
