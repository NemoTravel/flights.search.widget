import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

export default class Datepicker extends Component {
	static get dateFormat() {
		return 'DD.MM.YYYY';
	}
	
	renderCustomInput() {
		const { inputProps } = this.props;
		
		return <div className="nemo-widget-form__input__wrapper">
			<input type="text" className="form-control" readOnly={true} spellCheck={false} {...inputProps}/>
			<div className="nemo-ui-icon nemo-widget-form__input__calendar"/>
		</div>;
	}
	
	render() {
		const { date } = this.props;
		
		return <DatePicker 
			customInput={this.renderCustomInput()}
			calendarClassName="nemo-ui-datepicker" 
			dateFormat={Datepicker.dateFormat} 
			selected={date}
			{...this.props}
		/>;
	}
}