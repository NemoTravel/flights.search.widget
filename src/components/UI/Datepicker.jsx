import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

export default class Datepicker extends Component {
	constructor(props) {
		super(props);
		
		this.enable = this.enable.bind(this);
		this.disable = this.disable.bind(this);
	}
	
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
	 * Activate datepicker on focus.
	 */
	enable() {
		if (this.props.toggleDatePicker && !this.props.isActive) {
			this.props.toggleDatePicker(true, this.props.type);
		}
	}

	/**
	 * Deactivate datepicker.
	 */
	disable() {
		if (this.props.toggleDatePicker && this.props.isActive) {
			this.props.toggleDatePicker(false, this.props.type);
			this.props.datepickerChange(null, this.props.type);
		}
	}

	/**
	 * Custom input field with wrapper.
	 * 
	 * @returns {XML}
	 */
	renderCustomInput() {
		const { inputProps, date, isActive, toggleDatePicker } = this.props;
		let formattedDate = '',
			className = 'form-control nemo-widget-form__date';
		
		if (!isActive) {
			className += ' nemo-widget-form__date_disabled';
		}
		
		if (date) {
			formattedDate = date.format(Datepicker.dateFormat);
		}
		
		return <div className="nemo-widget-form__input__wrapper">
			<input 
				type="text" 
				className={className} 
				readOnly={true} 
				spellCheck={false} 
				value={formattedDate} 
				ref={input => this.inputField = input}
				{...inputProps}
			/>
			
			{
				toggleDatePicker && isActive ?
					<div className="nemo-ui-icon nemo-widget-form__input__closer" onClick={this.disable}/>
					: null
			}
			
			<div className="nemo-ui-icon nemo-widget-form__input__calendar" onClick={() => this.inputField.focus()}/>
		</div>;
	}
	
	render() {
		const { date, locale, isActive } = this.props;
		
		return <DatePicker
			disabled={!isActive}
			locale={locale}
			dropdownMode="scroll"
			showMonthDropdown={false}
			customInput={this.renderCustomInput()}
			calendarClassName="nemo-ui-datepicker" 
			dateFormat={Datepicker.dateFormat}
			dateFormatCalendar={Datepicker.dateFormatCalendar}
			selected={date}
			onFocus={this.enable}
			{...this.props}
		/>;
	}
}