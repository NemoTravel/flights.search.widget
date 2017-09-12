import React from 'react';
import Autocomplete from 'components/VerticalForm/Block/Search/Autocomplete';
import classnames from 'classnames';

export default class Arrival extends Autocomplete {
	get type() { return 'arrival'; }
	get placeholder() { return 'Куда'; }

	renderSwitcher() {
		let className = classnames(
			'nemo-ui-icon nemo-widget-form__input__switcher',
			{ 'nemo-ui-icon nemo-widget-form__input__switcher_withArrow': this.props.system.routingGrid }
		);

		return <div className={className} onClick={this.props.switchAirports}/>;
	}
}