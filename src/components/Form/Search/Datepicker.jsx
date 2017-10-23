import React, { Component } from 'react';
import UIDatepicker from 'components/UI/Datepicker';
import MobileHeader from 'components/UI/MobileHeader';
import moment from 'moment';
import autobind from 'autobind-decorator';

export default class Datepicker extends Component {
	constructor(props) {
		super(props);
		this.nemoDatepicker = null;

		this.type = null;
		this.placeholder = '';
		this.popperPlacement = null;
		this.tooltipText = '';
		this.showErrors = false;
		this.isDisableable = false;
	}

	/**
	 * Select date.
	 * 
	 * @param {Moment} date
	 */
	@autobind
	onChangeHandler(date) {
		this.props.selectDate(date, this.type);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { isActive, date, highlightDates, specialDate, showErrors, locale } = this.props;
		
		return isActive !== nextProps.isActive || 
			date !== nextProps.date ||
			locale !== nextProps.locale ||
			specialDate !== nextProps.specialDate ||
			showErrors !== nextProps.showErrors || 
			highlightDates !== nextProps.highlightDates;
	}

	@autobind
	closeDatepicker() {
		if (this.nemoDatepicker && this.nemoDatepicker.calendar) {
			this.nemoDatepicker.calendar.setOpen(false);
		}
	}

	@autobind
	renderInner() {
		const mobileHeaderClassName = `widget-ui-datepicker__header widget-ui-datepicker__header_${this.type}`;
		return <MobileHeader className={mobileHeaderClassName} title={this.placeholder} onClose={this.closeDatepicker}/>;
	}
	
	render() {
		const { 
		  	toggleDatePicker,
		  	selectDate,
		  	getRef,
			locale,
			date,
			isActive,
		  	showErrors,
		  	specialDate,
		  	openToDate,
		  	minDate:minDateProp, 
		  	maxDate:maxDateProp, 
		  	highlightDates = [] 
		} = this.props;
		
		let minDate = minDateProp ? minDateProp : moment();
		let maxDate = maxDateProp ? maxDateProp : moment().add(1, 'years');

		return <div className="col widget-form-dates__col">
			<UIDatepicker
				isDisableable={this.isDisableable}
				ref={calendar => this.nemoDatepicker = calendar}
				type={this.type}
				isActive={isActive} 
				onChange={this.onChangeHandler} 
				locale={locale}
				date={date}
				openToDate={openToDate} 
				minDate={minDate} 
				maxDate={maxDate}
				getRef={getRef}
				highlightDates={highlightDates}
				toggleDatePicker={toggleDatePicker}
				selectDate={selectDate}
				popperPlacement={this.popperPlacement}
				specialDate={specialDate}
				tooltipIsActive={!date && this.showErrors && showErrors}
				tooltipText={this.tooltipText}
				inputProps={{ placeholder: this.placeholder }}
			>
				{this.renderInner()}
			</UIDatepicker>
		</div>;
	}
}