import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as passengersActions from 'actions/passengers';
import { getPassengersTitle, getPassengersArray, getTotalPassengersCount } from 'selectors';
import Selector from 'components/VerticalForm/Search/Passengers/Selector';

class PassengersContainer extends Component {
	render() {
		const { passengers, title, totalPassengersCount, addPassenger, removePassenger } = this.props;
		
		return <Selector 
			passengers={passengers} 
			title={title} 
			totalPassengersCount={totalPassengersCount}
			removePassenger={removePassenger}
			addPassenger={addPassenger}
		/>;
	}
}

function mapStateToProps(state) {
	return {
		passengers: getPassengersArray(state),
		title: getPassengersTitle(state),
		totalPassengersCount: getTotalPassengersCount(state)
	};
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(passengersActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(PassengersContainer);