import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'actions/form';

import Search from 'components/Form/Search';

class Form extends Component {
	render() {
		const { showErrors, startSearch } = this.props;
		
		return <section className="widget-form">
			<Search showErrors={showErrors} startSearch={startSearch} />
		</section>;
	}
}

function mapStateToProps(state) {
	return {
		// blockVisibility: state.form.blockVisibility
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(formActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(Form);