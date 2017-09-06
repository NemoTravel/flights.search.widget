import React, { Component } from 'react';
import NemoDatepicker from 'components/UI/Datepicker';

export default class Datepicker extends Component {
	render() {
		const { placeholder, type } = this.props;

		return <div className={`col nemo-widget-form__${type}__date__col`}>
			<NemoDatepicker inputProps={{ placeholder }} />
		</div>;
	}
}