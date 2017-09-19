import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as passengersActions from 'actions/passengers';
import { getPassengersTitle, getPassengersArray, getTotalPassengersCount, getPassengersCounterAvailability } from 'selectors';
import Selector from 'components/VerticalForm/Search/Passengers/Selector';

class PassengersContainer extends Component {
	render() {
		const { passengers, counterAvailability, title, totalPassengersCount, addPassenger, removePassenger } = this.props;
		
		return <Selector 
			passengers={passengers} 
			title={title}
			counterAvailability={counterAvailability}
			totalPassengersCount={totalPassengersCount}
			removePassenger={removePassenger}
			addPassenger={addPassenger}
		/>;
	}
}

function mapStateToProps(state) {
	return {
		counterAvailability: getPassengersCounterAvailability(state),
		passengers: getPassengersArray(state),
		title: getPassengersTitle(state),
		totalPassengersCount: getTotalPassengersCount(state)
	};
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(passengersActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(PassengersContainer);