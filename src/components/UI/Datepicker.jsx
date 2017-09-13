import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';

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
		const { inputProps, date, isActive, toggleDatePicker, getRef:getRefProp } = this.props;
		let formattedDate = '',
			className = classnames(
				'form-control nemo-widget-form__date',
				{ 'nemo-widget-form__date_disabled': !isActive }
			);
		
		if (date) {
			formattedDate = date.format(Datepicker.dateFormat);
		}
		
		const getRef = (input) => {
			this.inputField = input;
			
			if (getRefProp) {
				getRefProp(input);
			}
		};
		
		return <div className="nemo-widget-form__input__wrapper">
			<input 
				type="text" 
				className={className} 
				readOnly={true} 
				spellCheck={false} 
				value={formattedDate} 
				ref={getRef}
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
		const { date, locale, isActive, specialDate } = this.props;
		
		const specialDayClassName = (date) => {
			return specialDate && date.format('YYYY-MM-DD') === specialDate.format('YYYY-MM-DD') ? 'nemo-ui-datepicker__specialDay' : '';
		};
		
		return <DatePicker
			disabled={!isActive}
			locale={locale}
			dayClassName={specialDayClassName}
			// dropdownMode="scroll"
			// showMonthDropdown={false}
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