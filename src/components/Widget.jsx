import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStore, cacheState } from 'store';
import { systemState } from 'state';
import { Provider } from 'react-redux';
import Main from 'components/Main';

/**
 * This component can be used in other React-applications.
 */
export default class Widget extends Component {
	static propTypes = {
		baseURL: PropTypes.string.isRequired,
		rootElement: PropTypes.node.isRequired
	};
	
	constructor(props) {
		super(props);
		const config = { ...systemState };
		
		for (const propName in props) {
			if (props.hasOwnProperty(propName)) {
				config[propName] = props[propName];
			}
		}

		this.store = getStore(config);
	}

	componentDidMount() {
		// Subscribe to new state updates and cache new state.
		this.store.subscribe(() => cacheState(this.store.getState()));
	}
	
	render() {
		return <Provider store={this.store}><Main/></Provider>;
	}
}