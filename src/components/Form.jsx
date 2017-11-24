import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'store/form/actions';
import classnames from 'classnames';
import Search from 'components/Form/Search';
import WebskyHiddenForm from 'components/WebskyHiddenForm';
import {
	isWebsky,
	showCouponField as showCouponFieldSelector,
	showMileCardField as showMileCardFieldSelector
} from 'store/form/selectors';

class Form extends React.Component {
	render() {
		const { startSearch, verticalForm, isWebskyMode, showCouponField, showMileCardField } = this.props;

		return <section className={classnames('widget-form', { 'widget-form_vertical': verticalForm })}>
			<Search startSearch={startSearch} showCouponField={showCouponField} showMileCardField={showMileCardField} />
			{isWebskyMode ? <WebskyHiddenForm/> : null}
		</section>;
	}
}

export default connect(
	state => ({
		verticalForm: state.system.verticalForm,
		isWebskyMode: isWebsky(state),
		showCouponField: showCouponFieldSelector(state),
		showMileCardField: showMileCardFieldSelector(state)
	}),
	dispatch => bindActionCreators(formActions, dispatch)
)(Form);
