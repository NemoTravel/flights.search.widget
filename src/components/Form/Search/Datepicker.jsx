import React, { Component } from 'react';
import NemoDatepicker from 'components/UI/Datepicker';
import moment from 'moment';
import { i18n } from 'utils';

export default class Datepicker extends Component {
	get type() { return null; }
	get placeholder() { return ''; }
	get popperPlacement() { return null; }
	get tooltipText() { return ''; }
	get showErrors() { return false; }
	
	constructor(props) {
		super(props);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.renderInner = this.renderInner.bind(this);
		this.nemoDatepicker = null;
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
	
	renderInner() {
		return <div className={`widget-ui-mobile__header widget-ui-mobile__header_visible widget-ui-datepicker__header widget-ui-datepicker__header_${this.type}`}>
			<div className="widget-ui-icon widget-ui-mobile__header__closer" onClick={() => {
				if (this.nemoDatepicker && this.nemoDatepicker.calendar) {
					this.nemoDatepicker.calendar.setOpen(false);
				}
			}}>
			</div>
			
			{this.placeholder}
		</div>;
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
				ref={calendar => this.nemoDatepicker = calendar}
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
			>
				{this.renderInner()}
			</NemoDatepicker>
		</div>;
	}
}