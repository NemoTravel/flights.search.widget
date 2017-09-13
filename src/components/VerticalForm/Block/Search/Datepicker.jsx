import React, { Component } from 'react';
import NemoDatepicker from 'components/UI/Datepicker';
import moment from 'moment';

export default class Datepicker extends Component {
	get type() { return null; }
	get placeholder() { return ''; }
	get popperPlacement() { return null; }
	
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
		this.props.datepickerChange(date, this.type);
	}
	
	render() {
		const { 
		  	toggleDatePicker,
		  	datepickerChange,
			locale,
			date,
			isActive,
		  	minDate:minDateProp, 
		  	maxDate:maxDateProp, 
		  	highlightDates = [] 
		} = this.props;
		
		let minDate = minDateProp ? minDateProp : moment();
		let maxDate = maxDateProp ? maxDateProp : moment().add(1, 'years');

		return <div className={`col nemo-widget-form__${this.type}__date__col`}>
			<NemoDatepicker 
				type={this.type}
				isActive={isActive} 
				onChange={this.onChangeHandler} 
				locale={locale}
				date={date}
				minDate={minDate} 
				maxDate={maxDate}
				highlightDates={highlightDates}
				toggleDatePicker={toggleDatePicker}
				datepickerChange={datepickerChange}
				popperPlacement={this.popperPlacement}
				inputProps={{ placeholder: this.placeholder }}
			/>
		</div>;
	}
}