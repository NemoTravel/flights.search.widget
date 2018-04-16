import * as React from 'react';
import { Provider } from 'react-redux';

import Main from './Main';
import { ApplicationState, SystemState, OnSearchFunction } from '../state';
import { Store } from 'redux';
import { cacheState, getStore } from '../store';

export interface Props extends SystemState {
	onSearch?: OnSearchFunction;
}

class Component extends React.Component<Props> {
	protected store: Store<ApplicationState>;

	constructor(props: Props) {
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
				<Main onSearch={this.props.onSearch}/>
			</Provider>
		);
	}
}

export default Component;
