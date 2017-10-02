import React from 'react';
import Autocomplete from 'components/Form/Search/Autocomplete';
import { i18n } from 'utils';

export default class Arrival extends Autocomplete {
	get type() { return 'arrival'; }
	get placeholder() { return i18n('form', 'to_full'); }
	get mobileTitle() { return i18n('form', 'to'); }
	get tooltipText() { return i18n('form', 'arrivalError'); }

	renderSwitcher() {
		return <div className={'widget-ui-icon widget-form-airports__swap'} title={i18n('form', 'swapAirports')} onClick={this.props.swapAirports}/>;
	}
}