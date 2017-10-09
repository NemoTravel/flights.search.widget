import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'actions/form';
import classnames from 'classnames';
import Search from 'components/Form/Search';
import WebskyHiddenForm from 'components/WebskyHiddenForm';
import { MODE_WEBSKY } from 'state';

class Form extends Component {
	render() {
		const { showErrors, startSearch, verticalForm, isWebsky } = this.props;
		
		return <section className={classnames('widget-form', { 'widget-form_vertical': verticalForm })}>
			<Search showErrors={showErrors} startSearch={startSearch} />
			{isWebsky ? <WebskyHiddenForm/> : null}
		</section>;
	}
}

function mapStateToProps(state) {
	return {
		verticalForm: state.system.verticalForm,
		isWebsky: state.system.mode === MODE_WEBSKY
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(formActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(Form);