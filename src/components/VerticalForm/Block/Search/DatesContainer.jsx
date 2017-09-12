import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as datesActions from 'actions/dates';
import DepartureDatepicker from 'components/VerticalForm/Block/Search/Datepicker/Departure';
import ReturnDatepicker from 'components/VerticalForm/Block/Search/Datepicker/Return';

class DatesContainer extends Component {
	render() {
		const { departureDatepicker, returnDatepicker, locale } = this.props;
		const { selectDate, toggleDatePicker } = this.props.actions;
		
		return <div className="form-group row">
			<DepartureDatepicker
				locale={locale}
				date={departureDatepicker.date}
				isActive={departureDatepicker.isActive}
				maxDate={returnDatepicker.date}
				selectDate={selectDate}
			/>
			
			<ReturnDatepicker
				locale={locale}
				date={returnDatepicker.date}
				isActive={returnDatepicker.isActive}
				minDate={departureDatepicker.date}
				selectDate={selectDate}
				toggleDatePicker={toggleDatePicker}
			/>
		</div>;
	}
}

function mapStateToProps(state) {
	return {
		locale: state.system.locale,
		departureDatepicker: state.form.search.dates.departure,
		returnDatepicker: state.form.search.dates.return
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(datesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(DatesContainer);