import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'actions/form';
import classnames from 'classnames';

import Search from 'components/Form/Search';

class Form extends Component {
	render() {
		const { showErrors, startSearch, verticalForm } = this.props;
		
		return <section className={classnames('widget-form', { 'widget-form_vertical': verticalForm })}>
			<Search showErrors={showErrors} startSearch={startSearch} />
		</section>;
	}
}

function mapStateToProps(state) {
	return {
		verticalForm: state.system.verticalForm
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(formActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(Form);