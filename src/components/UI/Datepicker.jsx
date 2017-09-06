import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

class Datepicker extends Component {
	
	/**
	 * Global date format.
	 * 
	 * @returns {string}
	 */
	static get dateFormat() {
		return 'DD.MM.YYYY';
	}

	/**
	 * Date format for the calendar title.
	 * 
	 * @returns {string}
	 */
	static get dateFormatCalendar() {
		return 'MMMM';
	}

	/**
	 * Custom input field with wrapper.
	 * 
	 * @returns {XML}
	 */
	renderCustomInput() {
		const { inputProps, date } = this.props;
		let formattedDate = '';
		
		if (date) {
			formattedDate = date.format(Datepicker.dateFormat);
		}
		
		return <div className="nemo-widget-form__input__wrapper">
			<input type="text" className="form-control" readOnly={true} spellCheck={false} value={formattedDate} {...inputProps}/>
			<div className="nemo-ui-icon nemo-widget-form__input__calendar"/>
		</div>;
	}
	
	render() {
		const { date, system } = this.props;
		
		return <DatePicker
			locale={system.locale}
			dropdownMode="scroll"
			showMonthDropdown={false}
			customInput={this.renderCustomInput()}
			calendarClassName="nemo-ui-datepicker" 
			dateFormat={Datepicker.dateFormat}
			dateFormatCalendar={Datepicker.dateFormatCalendar}
			selected={date}
			{...this.props}
		/>;
	}
}

export default connect(({ system }) => { return { system }; })(Datepicker);