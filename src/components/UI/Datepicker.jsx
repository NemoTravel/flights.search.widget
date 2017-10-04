import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';
import Tooltip from 'components/UI/Tooltip';

export default class Datepicker extends Component {
	constructor(props) {
		super(props);
		
		this.enable = this.enable.bind(this);
		this.disable = this.disable.bind(this);
		this.renderCloser = this.renderCloser.bind(this);
		this.calendar = null;
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
			this.props.selectDate(null, this.props.type);
		}
	}
	
	renderCloser() {
		const { isActive, toggleDatePicker } = this.props;
		return toggleDatePicker && isActive ? <div className="widget-ui-input__closer" onClick={this.disable}/> : null;
	}

	/**
	 * Custom input field with wrapper.
	 * 
	 * @returns {XML}
	 */
	renderCustomInput() {
		const { inputProps, date, isActive, getRef, tooltipIsActive, tooltipText, toggleDatePicker } = this.props;
		const formattedDate = date ? date.format('D MMMM, dd') : '';
		
		if (getRef) {
			inputProps.ref = getRef;
		}

		return <div className="widget-ui-input__wrapper">
			<Tooltip message={tooltipText} isActive={tooltipIsActive}>
				<input
					type="text"
					className={classnames('form-control widget-ui-input', { 'widget-ui-input_disabled': !isActive })}
					readOnly={true}
					spellCheck={false}
					value={formattedDate}
					{...inputProps}
					onFocus={event => event.target.blur()}
				/>
			</Tooltip>

			{this.renderCloser()}

			{!toggleDatePicker || !isActive ? <div className="widget-ui-datepicker__calendar"/> : null}
		</div>;
	}
	
	render() {
		const { date, locale, isActive, specialDate, type } = this.props;
		
		const specialDayClassName = (date) => {
			return specialDate && date.format('YYYY-MM-DD') === specialDate.format('YYYY-MM-DD') ? 'widget-ui-datepicker__specialDay' : null;
		};
		
		return <DatePicker
			ref={calendar => this.calendar = calendar}
			disabled={!isActive}
			locale={locale}
			dayClassName={specialDayClassName}
			// dropdownMode="scroll"
			// showMonthDropdown={false}
			customInput={this.renderCustomInput()}
			calendarClassName={`widget-ui-datepicker widget-ui-datepicker_${type}`} 
			dateFormat={Datepicker.dateFormat}
			dateFormatCalendar={Datepicker.dateFormatCalendar}
			selected={date}
			monthsShown={2}
			onFocus={this.enable}
			{...this.props}
		>
			{this.props.children}
		</DatePicker>;
	}
}