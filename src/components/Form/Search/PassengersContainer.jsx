import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as passengersActions from 'store/form/passengers/actions';
import { 
	getPassengersTitle, 
	getPassengersArray, 
	getTotalPassengersCount, 
	getPassengersCounterAvailability 
} from 'store/form/passengers/selectors';
import Selector from 'components/Form/Search/Passengers/Selector';

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

export default connect(
	state => {
		return {
			counterAvailability: getPassengersCounterAvailability(state),
			passengers: getPassengersArray(state),
			title: getPassengersTitle(state),
			totalPassengersCount: getTotalPassengersCount(state)
		};
	}, 
	dispatch => bindActionCreators(passengersActions, dispatch)
)(PassengersContainer);