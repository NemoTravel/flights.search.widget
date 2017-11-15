import React from 'react';
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
import * as classTypeActions from 'store/form/additional/actions';
import { getClassType } from 'store/form/additional/selector';
import { CLASS_TYPES, MODE_NEMO } from 'state';

class PassengersContainer extends React.Component {
	render() {
		const { passengers, counterAvailability, title, totalPassengersCount, addPassenger, removePassenger, classOptions, setClassType, selectedClass, widgetMode } = this.props;

		return <Selector
			passengers={passengers}
			title={title}
			counterAvailability={counterAvailability}
			totalPassengersCount={totalPassengersCount}
			removePassenger={removePassenger}
			addPassenger={addPassenger}
			setClassType={setClassType}
			classOptions={classOptions}
			selectedClass={selectedClass}
			isModeNemo={widgetMode === MODE_NEMO}
		/>;
	}
}

export default connect(
	state => {
		return {
			counterAvailability: getPassengersCounterAvailability(state),
			passengers: getPassengersArray(state),
			title: getPassengersTitle(state),
			totalPassengersCount: getTotalPassengersCount(state),
			selectedClass: getClassType(state),
			classOptions: CLASS_TYPES,
			widgetMode: state.system.mode
		};
	},
	dispatch => bindActionCreators({ ...passengersActions, ...classTypeActions }, dispatch)
)(PassengersContainer);
