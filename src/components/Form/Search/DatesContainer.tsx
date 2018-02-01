import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import DepartureDatepicker from './Datepicker/Departure';
import ReturnDatepicker from './Datepicker/Return';
import {
	getDepartureHighlightedDates, getReturnHighlightedDates,
	HighlightedDatesGroup
} from '../../../store/form/dates/selectors';
import { ApplicationState, CommonThunkAction, DatepickerFieldType, DatepickerState, SystemState } from '../../../state';
import {
	DatepickerAction,
	datepickerChange,
	setAvailableDates,
	toggleDatePicker
} from '../../../store/form/dates/actions';
import { Moment } from 'moment';

interface StateProps {
	system: SystemState;
	departureDatepicker: DatepickerState;
	returnDatepicker: DatepickerState;
	showErrors: boolean;
	getDepartureHighlightedDates: HighlightedDatesGroup[];
	getReturnHighlightedDates: HighlightedDatesGroup[];
}

interface DispatchProps {
	toggleDatePicker: (isActive: boolean, dateType: DatepickerFieldType) => DatepickerAction;
	setAvailableDates: (availableDates: any, dateType: DatepickerFieldType) => DatepickerAction;
	datepickerChange: (date: Moment, dateType: DatepickerFieldType) => CommonThunkAction;
}

class DatesContainer extends React.Component<StateProps & DispatchProps> {
	protected returnInput: any = null;

	render(): React.ReactNode {
		const { departureDatepicker, returnDatepicker, system, showErrors, toggleDatePicker, datepickerChange } = this.props;

		let returnInitialDate = departureDatepicker.date;

		if (
			departureDatepicker.date &&
			returnDatepicker.date &&
			Math.round(returnDatepicker.date.diff(departureDatepicker.date, 'months', true)) > 1
		) {
			returnInitialDate = returnDatepicker.date;
		}

		return <div className="form-group row widget-form-dates">
			<DepartureDatepicker
				showErrors={showErrors}
				locale={system.locale}
				date={departureDatepicker.date}
				isActive={departureDatepicker.isActive}
				selectDate={(date, dateType) => {
					datepickerChange(date, dateType);

					if (system.autoFocusReturnDate && this.returnInput) {
						const self = this;

						setTimeout(function () {
							self.returnInput.focus();
						}, 20);
					}
				}}
				highlightDates={this.props.getDepartureHighlightedDates}
				specialDate={returnDatepicker.date}
			/>

			<ReturnDatepicker
				locale={system.locale}
				date={returnDatepicker.date}
				isActive={returnDatepicker.isActive}
				openToDate={returnInitialDate}
				selectDate={datepickerChange}
				toggleDatePicker={toggleDatePicker}
				highlightDates={this.props.getReturnHighlightedDates}
				getRef={(input: any): any => (this.returnInput = input)}
				specialDate={departureDatepicker.date}
			/>
		</div>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		system: state.system,
		departureDatepicker: state.form.dates.departure,
		returnDatepicker: state.form.dates.return,
		showErrors: state.form.showErrors,
		getDepartureHighlightedDates: getDepartureHighlightedDates(state),
		getReturnHighlightedDates: getReturnHighlightedDates(state)
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		toggleDatePicker: bindActionCreators(toggleDatePicker, dispatch),
		setAvailableDates: bindActionCreators(setAvailableDates, dispatch),
		datepickerChange: bindActionCreators(datepickerChange, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(DatesContainer);
