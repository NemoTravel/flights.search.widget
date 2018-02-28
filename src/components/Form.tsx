import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import * as classnames from 'classnames';

import {startSearch as startSearchAction} from '../store/form/actions';
import Search from './Form/Search';
import WebskyHiddenForm from './WebskyHiddenForm';
import {
	isWebsky,
	showCouponField as showCouponFieldSelector,
	showMileCardField as showMileCardFieldSelector,
	routeType
} from '../store/form/selectors';
import {ApplicationState, CommonThunkAction, RouteType} from '../state';
import {setRouteType as setRouteAction, SetRouteTypeAction} from "../store/form/route/actions";

interface StateProps {
	verticalForm: boolean;
	isWebskyMode: boolean;
	showCouponField: boolean;
	showMileCardField: boolean;
	isComplexRoute: RouteType;
}

interface DispatchProps {
	startSearch: () => CommonThunkAction;
	setRouteType: (type: RouteType) => CommonThunkAction;
}

class Form extends React.Component<StateProps & DispatchProps> {
	render(): React.ReactNode {
		const { startSearch, verticalForm, isWebskyMode, showCouponField, showMileCardField, isComplexRoute, setRouteType } = this.props;

		return <section className={classnames('widget-form', { 'widget-form_vertical': verticalForm })}>
			<Search
				startSearch={startSearch}
				showCouponField={showCouponField}
				isComplexRoute={isComplexRoute}
				setRouteType={setRouteType}
				showMileCardField={showMileCardField}/>
			{isWebskyMode ? <WebskyHiddenForm/> : null}
		</section>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		verticalForm: state.system.verticalForm,
		isWebskyMode: isWebsky(state),
		showCouponField: showCouponFieldSelector(state),
		showMileCardField: showMileCardFieldSelector(state),
		isComplexRoute: routeType(state)
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		startSearch: bindActionCreators(startSearchAction, dispatch),
		setRouteType: bindActionCreators(setRouteAction, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(Form);
