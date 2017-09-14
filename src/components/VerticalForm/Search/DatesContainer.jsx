import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as datesActions from 'actions/dates';
import DepartureDatepicker from 'components/VerticalForm/Search/Datepicker/Departure';
import ReturnDatepicker from 'components/VerticalForm/Search/Datepicker/Return';
import { getDatesBetweenDepartureAndReturn } from 'selectors';

class DatesContainer extends Component {
	constructor(props) {
		super(props);
		this.getReturnRef = this.getReturnRef.bind(this);
	}
	
	getReturnRef(input) {
		this.returnInput = input;
	}
	
	render() {
		const { departureDatepicker, returnDatepicker, locale, showErrors } = this.props;
		const { datepickerChange:originalDatepickerChange, toggleDatePicker } = this.props.actions;
		
		// Open return datepicker after selecting the departure date.
		const datepickerChange = (date, dateType) => {
			originalDatepickerChange(date, dateType);
			
			if (dateType === 'departure') {
				this.returnInput.focus();
			}
		};
		
		return <div className="form-group row">
			<DepartureDatepicker
				showErrors={showErrors}
				locale={locale}
				date={departureDatepicker.date}
				isActive={departureDatepicker.isActive}
				datepickerChange={datepickerChange}
				highlightDates={this.props.datesBetweenDepartureAndReturn}
				specialDate={returnDatepicker.date}
			/>
			
			<ReturnDatepicker
				locale={locale}
				date={returnDatepicker.date}
				isActive={returnDatepicker.isActive}
				datepickerChange={datepickerChange}
				toggleDatePicker={toggleDatePicker}
				highlightDates={this.props.datesBetweenDepartureAndReturn}
				getRef={this.getReturnRef}
				specialDate={departureDatepicker.date}
			/>
		</div>;
	}
}

function mapStateToProps(state) {
	return {
		locale: state.system.locale,
		departureDatepicker: state.form.dates.departure,
		returnDatepicker: state.form.dates.return,
		showErrors: state.form.showErrors,
		datesBetweenDepartureAndReturn: getDatesBetweenDepartureAndReturn(state)
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(datesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(DatesContainer);