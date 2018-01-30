import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import {
	getPassengersTitle,
	getPassengersArray,
	getTotalPassengersCount,
	getPassengersCounterAvailability, PassengersCounterAvailability
} from '../../../store/form/passengers/selectors';
import Selector from './Passengers/Selector';
import { getClassType } from '../../../store/form/additional/selector';
import {
	ApplicationMode, ApplicationState, CLASS_TYPES, PassengerState, PassengerType,
	ServiceClass
} from '../../../state';
import { PassengersAction, addPassenger, removePassenger, setCounter } from '../../../store/form/passengers/actions';
import { SetClassAction, setClassType } from '../../../store/form/additional/actions';

interface StateProps {
	counterAvailability: PassengersCounterAvailability;
	passengers: PassengerState[];
	title: string;
	totalPassengersCount: number;
	selectedClass: ServiceClass;
	classOptions: string[];
	widgetMode: ApplicationMode;
}

interface DispatchProps {
	addPassenger: (passengerType: PassengerType) => PassengersAction;
	removePassenger: (passengerType: PassengerType) => PassengersAction;
	setCounter: (count: number, passengerType: PassengerType) => PassengersAction;
	setClassType: (classType: ServiceClass) => SetClassAction;
}

class PassengersContainer extends React.Component<StateProps & DispatchProps> {
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
			isModeNemo={widgetMode === ApplicationMode.NEMO}
		/>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		counterAvailability: getPassengersCounterAvailability(state),
		passengers: getPassengersArray(state),
		title: getPassengersTitle(state),
		totalPassengersCount: getTotalPassengersCount(state),
		selectedClass: getClassType(state),
		classOptions: CLASS_TYPES,
		widgetMode: state.system.mode
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		addPassenger: bindActionCreators(addPassenger, dispatch),
		removePassenger: bindActionCreators(removePassenger, dispatch),
		setCounter: bindActionCreators(setCounter, dispatch),
		setClassType: bindActionCreators(setClassType, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(PassengersContainer);
