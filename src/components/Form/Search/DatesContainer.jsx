import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as datesActions from 'actions/dates';
import DepartureDatepicker from 'components/Form/Search/Datepicker/Departure';
import ReturnDatepicker from 'components/Form/Search/Datepicker/Return';
import { getDatesBetweenDepartureAndReturn } from 'selectors';

class DatesContainer extends Component {
	constructor(props) {
		super(props);
		
		this.getReturnRef = this.getReturnRef.bind(this);
		// this.selectDateWrapper = this.selectDateWrapper.bind(this);
	}
	
	getReturnRef(input) {
		this.returnInput = input;
	}

	// /**
	//  * Open return datepicker after selecting the departure date.
	//  * 
	//  * @returns {Function}
	//  */
	// selectDateWrapper() {
	// 	const originalSelectDate = this.props.actions.datepickerChange;
	//
	// 	return (date, dateType) => {
	// 		originalSelectDate(date, dateType);
	//
	// 		if (dateType === 'departure') {
	// 			this.returnInput.focus();
	// 		}
	// 	};
	// }
	
	render() {
		const { departureDatepicker, returnDatepicker, locale, showErrors } = this.props;
		const { toggleDatePicker, datepickerChange } = this.props.actions;
		
		return <div className="form-group row widget-form-dates">
			<DepartureDatepicker
				showErrors={showErrors}
				locale={locale}
				date={departureDatepicker.date}
				isActive={departureDatepicker.isActive}
				selectDate={datepickerChange}
				highlightDates={this.props.datesBetweenDepartureAndReturn}
				specialDate={returnDatepicker.date}
			/>
			
			<ReturnDatepicker
				locale={locale}
				date={returnDatepicker.date}
				isActive={returnDatepicker.isActive}
				selectDate={datepickerChange}
				toggleDatePicker={toggleDatePicker}
				highlightDates={this.props.datesBetweenDepartureAndReturn}
				getRef={this.getReturnRef}
				specialDate={departureDatepicker.date}
			/>
		</div>;
	}
}

export default connect(
	state => {
		return {
			locale: state.system.locale,
			departureDatepicker: state.form.dates.departure,
			returnDatepicker: state.form.dates.return,
			showErrors: state.form.showErrors,
			datesBetweenDepartureAndReturn: getDatesBetweenDepartureAndReturn(state)
		};
	},
	dispatch => {
		return {
			actions: bindActionCreators(datesActions, dispatch)
		};
	}
)(DatesContainer);