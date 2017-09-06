import React, { Component } from 'react';
import NemoDatepicker from 'components/UI/Datepicker';
import moment from 'moment';

export default class Datepicker extends Component {
	render() {
		const 
			{ placeholder, type } = this.props,
			minDate = moment(), // allow to pick dates between today...
			maxDate = moment().add(1, 'years'); // ...and +1 year

		return <div className={`col nemo-widget-form__${type}__date__col`}>
			<NemoDatepicker minDate={minDate} maxDate={maxDate} inputProps={{ placeholder }}/>
		</div>;
	}
}