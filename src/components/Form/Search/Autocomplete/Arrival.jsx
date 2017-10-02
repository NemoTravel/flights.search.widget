import React from 'react';
import Autocomplete from 'components/Form/Search/Autocomplete';
import { i18n } from 'utils';
import PropTypes from 'prop-types';

export default class Arrival extends Autocomplete {
	static propTypes = {
		isLoading: PropTypes.bool,
		suggestions: PropTypes.array,
		inputValue: PropTypes.string,
		airport: PropTypes.object,
		system: PropTypes.object.isRequired,
		showErrors: PropTypes.bool.isRequired,
		changeAutocompleteSuggestions: PropTypes.func.isRequired,
		changeAutocompleteInputValue: PropTypes.func.isRequired,
		sendAutocompleteRequest: PropTypes.func.isRequired,
		swapAirports: PropTypes.func.isRequired,
		selectAirport: PropTypes.func.isRequired,
		getRef: PropTypes.func.isRequired
	};
	
	get type() { return 'arrival'; }
	get placeholder() { return i18n('form', 'to_full'); }
	get mobileTitle() { return i18n('form', 'to'); }
	get tooltipText() { return i18n('form', 'arrivalError'); }

	renderSwitcher() {
		return <div className={'widget-ui-icon widget-form-airports__swap'} title={i18n('form', 'swapAirports')} onClick={this.props.swapAirports}/>;
	}
}