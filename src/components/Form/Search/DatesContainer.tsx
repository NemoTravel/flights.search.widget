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
	ApplicationState, CommonThunkAction, DatepickerFieldType, DatepickerState, RouteType, SegmentState,
	SystemState
} from '../../../state';
import {
	DatepickerAction,
	datepickerChange,
	setAvailableDates
} from '../../../store/form/segments/dates/actions';
import { Moment } from 'moment';
import { isCR, isRT } from '../../../store/form/selectors';
import { setRouteType } from "../../../store/form/route/actions";

interface StateProps {
	system: SystemState;
	showErrors: boolean;
	getDepartureHighlightedDates: HighlightedDatesGroup[];
	getReturnHighlightedDates: HighlightedDatesGroup[];
	isCR: boolean;
	isRT: boolean;
	segments: SegmentState[];
}

interface Props {
	segmentId: number;
	datesIsNotOrder?: boolean;
	departureDatepicker: DatepickerState;
	returnDatepicker: DatepickerState;
}

interface DispatchProps {
	setAvailableDates: (availableDates: any, dateType: DatepickerFieldType) => DatepickerAction;
	setRouteType: (type: RouteType) => CommonThunkAction;
	datepickerChange: (date: Moment, dateType: DatepickerFieldType, segmentId: number) => CommonThunkAction;
}

class DatesContainer extends React.Component<StateProps & DispatchProps & Props> {
	protected returnInput: HTMLInputElement = null;

	render(): React.ReactNode {
		const { departureDatepicker, returnDatepicker, system, showErrors, datepickerChange, isCR, isRT, segmentId, datesIsNotOrder, setRouteType, segments } = this.props;
		const DATEPICKER_SWITCH_DELAY = 20;

		let returnInitialDate = departureDatepicker.date;

		if (
			returnDatepicker &&
			departureDatepicker.date &&
			returnDatepicker.date &&
			Math.round(returnDatepicker.date.diff(departureDatepicker.date, 'months', true)) > 1
		) {
			returnInitialDate = returnDatepicker.date;
		}

		return <div className="form-group row widget-form-dates">
			<DepartureDatepicker
				showErrors={showErrors}
				wrongDatesOrder={datesIsNotOrder}
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
				specialDate={isRT ? segments[1].date.date : null}
				popperPlacement={isCR ? 'top-end' : 'top-start'}
				segmentId={segmentId}
			/>

			{ !isCR ?
				<ReturnDatepicker
					locale={system.locale}
					date={isRT ? segments[1].date.date : null}
					isActive={isRT}
					openToDate={returnInitialDate}
					selectDate={datepickerChange}
					highlightDates={this.props.getReturnHighlightedDates}
					getRef={(input: HTMLInputElement): any => (this.returnInput = input)}
					specialDate={segments.length ? segments[0].date.date : null}
					popperPlacement="top-end"
					segmentId={isRT ? 1 : null}
					setRouteType={setRouteType}
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
		isCR: isCR(state),
		isRT: isRT(state),
		segments: state.form.segments
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		setAvailableDates: bindActionCreators(setAvailableDates, dispatch),
		setRouteType: bindActionCreators(setRouteType, dispatch),
		datepickerChange: bindActionCreators(datepickerChange, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(DatesContainer);
