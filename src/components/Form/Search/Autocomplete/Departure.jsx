import React from 'react';
import Autocomplete from 'components/Form/Search/Autocomplete';
import { i18n } from 'utils';
import PropTypes from 'prop-types';

export default class Departure extends Autocomplete {
	static propTypes = {
		isLoading: PropTypes.bool,
		suggestions: PropTypes.array,
		sameAirportsError: PropTypes.bool,
		airport: PropTypes.object,
		readOnly: PropTypes.bool,
		isGridMode: PropTypes.bool,
		showErrors: PropTypes.bool.isRequired,
		changeAutocompleteSuggestions: PropTypes.func.isRequired,
		sendAutocompleteRequest: PropTypes.func.isRequired,
		selectAirport: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.type = 'departure';
		this.placeholder = i18n('form', 'from_full');
		this.mobileTitle = i18n('form', 'from');
		this.defaultErrorText = i18n('form', 'departureError');
	}
}