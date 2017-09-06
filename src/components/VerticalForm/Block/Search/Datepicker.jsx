import React, { Component } from 'react';
import NemoDatepicker from 'components/UI/Datepicker';
import moment from 'moment';

export default class Datepicker extends Component {
	constructor(props) {
		super(props);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	/**
	 * Select date
	 * 
	 * @param {Moment} date
	 */
	onChangeHandler(date) {
		this.props.selectDate(date, this.props.type);
	}
	
	render() {
		const 
			{ placeholder, type, state } = this.props,
			minDate = moment(), // allow to pick dates between today...
			maxDate = moment().add(1, 'years'); // ...and +1 year

		return <div className={`col nemo-widget-form__${type}__date__col`}>
			<NemoDatepicker onChange={this.onChangeHandler} date={state.date} minDate={minDate} maxDate={maxDate} inputProps={{ placeholder }}/>
		</div>;
	}
}