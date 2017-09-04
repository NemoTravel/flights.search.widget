import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VerticalForm from 'components/VerticalForm';
import * as formActions from 'actions/form';

/**
 * What's going on?
 * ---------------------------------
 * This is the Root component of our application.
 * Only this component is bound directly to the current state by React-Redux `connect` function.
 * Other components are stateless and all needed stuff is passed to them as a React properties.
 */
class Main extends Component {
	render() {
		const { form } = this.props;
		const { toggleBlock } = this.props.formActions;
		
		return <section className="nemo-widget">
			<VerticalForm {...form} toggleBlock={toggleBlock}/>
		</section>;
	}
}

/**
 * Get data from the application state and pass it to the component as a React properties.
 * 
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
	return {
		form: state.form
	}
}

/**
 * Map actions to the React properties.
 * 
 * @param {Function} dispatch
 * @returns {Object}
 */
function mapActionsToProps(dispatch) {
	return {
		formActions: bindActionCreators(formActions, dispatch)
	};
}

/**
 * Connects this component to the current application state and dispatchable actions.
 */
export default connect(mapStateToProps, mapActionsToProps)(Main);