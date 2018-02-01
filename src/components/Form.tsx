import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import * as classnames from 'classnames';

import { showErrors, startSearch } from '../store/form/actions';
import Search from './Form/Search';
import WebskyHiddenForm from './WebskyHiddenForm';
import {
	isWebsky,
	showCouponField as showCouponFieldSelector,
	showMileCardField as showMileCardFieldSelector
} from '../store/form/selectors';
import { ApplicationState, CommonThunkAction } from '../state';

interface StateProps {
	verticalForm: boolean;
	isWebskyMode: boolean;
	showCouponField: boolean;
	showMileCardField: boolean;
}

interface DispatchProps {
	showErrors: (shouldShowErrors: boolean) => AnyAction;
	startSearch: () => CommonThunkAction;
}

class Form extends React.Component<StateProps & DispatchProps> {
	render(): React.ReactNode {
		const { startSearch, verticalForm, isWebskyMode, showCouponField, showMileCardField } = this.props;

		return <section className={classnames('widget-form', { 'widget-form_vertical': verticalForm })}>
			<Search startSearch={startSearch} showCouponField={showCouponField} showMileCardField={showMileCardField}/>
			{isWebskyMode ? <WebskyHiddenForm/> : null}
		</section>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		verticalForm: state.system.verticalForm,
		isWebskyMode: isWebsky(state),
		showCouponField: showCouponFieldSelector(state),
		showMileCardField: showMileCardFieldSelector(state)
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		showErrors: bindActionCreators(showErrors, dispatch),
		startSearch: bindActionCreators(startSearch, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(Form);
