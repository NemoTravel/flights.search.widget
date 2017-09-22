import React, { Component } from 'react';
import NemoDatepicker from 'components/UI/Datepicker';
import moment from 'moment';

export default class Datepicker extends Component {
	get type() { return null; }
	get placeholder() { return ''; }
	get popperPlacement() { return null; }
	get tooltipText() { return ''; }
	get showErrors() { return false; }
	
	constructor(props) {
		super(props);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	/**
	 * Select date.
	 * 
	 * @param {Moment} date
	 */
	onChangeHandler(date) {
		this.props.selectDate(date, this.type);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { isActive, date, highlightDates, specialDate, showErrors } = this.props;
		
		return isActive !== nextProps.isActive || 
			date !== nextProps.date ||
			specialDate !== nextProps.specialDate ||
			showErrors !== nextProps.showErrors || 
			highlightDates !== nextProps.highlightDates;
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
		  	minDate:minDateProp, 
		  	maxDate:maxDateProp, 
		  	highlightDates = [] 
		} = this.props;
		
		let minDate = minDateProp ? minDateProp : moment();
		let maxDate = maxDateProp ? maxDateProp : moment().add(1, 'years');

		return <div className={`col widget-form-dates__col`}>
			<NemoDatepicker 
				type={this.type}
				isActive={isActive} 
				onChange={this.onChangeHandler} 
				locale={locale}
				date={date}
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
			/>
		</div>;
	}
}