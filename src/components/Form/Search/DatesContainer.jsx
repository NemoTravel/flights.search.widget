import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as datesActions from 'store/form/dates/actions';
import DepartureDatepicker from 'components/Form/Search/Datepicker/Departure';
import ReturnDatepicker from 'components/Form/Search/Datepicker/Return';
import { getDepartureHighlightedDates, getReturnHighlightedDates } from 'store/form/dates/selectors';

class DatesContainer extends Component {
	render() {
		const { departureDatepicker, returnDatepicker, system, showErrors } = this.props;
		const { toggleDatePicker, datepickerChange } = this.props.actions;
		
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
						this.returnInput.focus();
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
				getRef={input => this.returnInput = input}
				specialDate={departureDatepicker.date}
			/>
		</div>;
	}
}

export default connect(
	state => {
		return {
			system: state.system,
			departureDatepicker: state.form.dates.departure,
			returnDatepicker: state.form.dates.return,
			showErrors: state.form.showErrors,
			getDepartureHighlightedDates: getDepartureHighlightedDates(state),
			getReturnHighlightedDates: getReturnHighlightedDates(state)
		};
	},
	dispatch => {
		return {
			actions: bindActionCreators(datesActions, dispatch)
		};
	}
)(DatesContainer);