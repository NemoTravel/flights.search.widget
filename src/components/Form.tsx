import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import * as classnames from 'classnames';

import { startSearch as startSearchAction } from '../store/form/actions';
import Search from './Form/Search';
import WebskyHiddenForm from './WebskyHiddenForm';
import {
	isWebsky,
	showCouponField as showCouponFieldSelector,
	showMileCardField as showMileCardFieldSelector
} from '../store/form/selectors';
import { ApplicationState, CommonThunkAction, OnSearchFunction } from '../state';

interface OwnProps {
	onSearch?: OnSearchFunction;
}

interface StateProps {
	verticalForm: boolean;
	isWebskyMode: boolean;
	showCouponField: boolean;
	showMileCardField: boolean;
}

interface DispatchProps {
	startSearch: (onSearch?: OnSearchFunction) => CommonThunkAction;
}

class Form extends React.Component<OwnProps & StateProps & DispatchProps> {
	render(): React.ReactNode {
		const { startSearch, onSearch, verticalForm, isWebskyMode, showCouponField, showMileCardField } = this.props;

		return <section className={classnames('widget-form', { 'widget-form_vertical': verticalForm })}>
			<Search
				onSearch={onSearch}
				startSearch={startSearch}
				showCouponField={showCouponField}
				showMileCardField={showMileCardField}/>
			{isWebskyMode ? <WebskyHiddenForm/> : null}
		</section>;
	}
}

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps): OwnProps & StateProps => {
	return {
		...ownProps,
		verticalForm: state.system.verticalForm,
		isWebskyMode: isWebsky(state),
		showCouponField: showCouponFieldSelector(state),
		showMileCardField: showMileCardFieldSelector(state)
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction, any>): DispatchProps => {
	return {
		startSearch: bindActionCreators(startSearchAction, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(Form);
