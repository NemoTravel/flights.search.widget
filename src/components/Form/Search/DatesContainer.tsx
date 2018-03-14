import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import DepartureDatepicker from './Datepicker/Departure';
import ReturnDatepicker from './Datepicker/Return';
import {
	getDepartureHighlightedDates, getReturnHighlightedDates,
	HighlightedDatesGroup
} from '../../../store/form/segments/dates/selectors';
import {
	ApplicationState, CommonThunkAction, DatepickerFieldType, DatepickerState,
	SystemState
} from '../../../state';
import {
	DatepickerAction,
	datepickerChange,
	setAvailableDates
} from '../../../store/form/segments/dates/actions';
import { Moment } from 'moment';
import { isCR } from '../../../store/form/selectors';

interface StateProps {
	system: SystemState;
	showErrors: boolean;
	getDepartureHighlightedDates: HighlightedDatesGroup[];
	getReturnHighlightedDates: HighlightedDatesGroup[];
	isCR: boolean;
}

interface Props {
	segmentId: number;
	datesIsNotOrder?: boolean;
	departureDatepicker: DatepickerState;
	returnDatepicker: DatepickerState;
}

interface DispatchProps {
	setAvailableDates: (availableDates: any, dateType: DatepickerFieldType) => DatepickerAction;
	datepickerChange: (date: Moment, dateType: DatepickerFieldType, segmentId: number) => CommonThunkAction;
}

class DatesContainer extends React.Component<StateProps & DispatchProps & Props> {
	protected returnInput: HTMLInputElement = null;

	render(): React.ReactNode {
		const { departureDatepicker, returnDatepicker, system, showErrors, datepickerChange, isCR, segmentId, datesIsNotOrder } = this.props;
		const DATEPICKER_SWITCH_DELAY = 20;

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
				datesIsNotInOrder={datesIsNotOrder}
				locale={system.locale}
				date={departureDatepicker.date}
				isActive={departureDatepicker.isActive}
				selectDate={(date: Moment, dateType: DatepickerFieldType) => {
					datepickerChange(date, dateType, segmentId);

					if (system.autoFocusReturnDate && this.returnInput) {
						setTimeout(() => {
							this.returnInput.focus();
						}, DATEPICKER_SWITCH_DELAY);
					}
				}}
				highlightDates={this.props.getDepartureHighlightedDates}
				specialDate={returnDatepicker.date}
				popperPlacement={isCR ? 'top-end' : 'top-start'}
				segmentId={segmentId}
			/>

			{ !isCR ?
				<ReturnDatepicker
					locale={system.locale}
					date={returnDatepicker.date}
					isActive={returnDatepicker.isActive}
					openToDate={returnInitialDate}
					selectDate={datepickerChange}
					highlightDates={this.props.getReturnHighlightedDates}
					getRef={(input: HTMLInputElement): any => (this.returnInput = input)}
					specialDate={departureDatepicker.date}
					popperPlacement="top-end"
					segmentId={segmentId}
				/> : null }
		</div>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		system: state.system,
		showErrors: state.form.showErrors,
		getDepartureHighlightedDates: getDepartureHighlightedDates(state),
		getReturnHighlightedDates: getReturnHighlightedDates(state),
		isCR: isCR(state)
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		setAvailableDates: bindActionCreators(setAvailableDates, dispatch),
		datepickerChange: bindActionCreators(datepickerChange, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(DatesContainer);
