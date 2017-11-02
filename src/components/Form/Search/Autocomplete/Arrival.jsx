import Autocomplete from 'components/Form/Search/Autocomplete';
import { i18n } from 'utils';
import PropTypes from 'prop-types';

class Arrival extends Autocomplete {
	constructor(props) {
		super(props);

		this.type = 'arrival';
		this.placeholder = i18n('form', 'to_full');
		this.mobileTitle = i18n('form', 'to');
		this.defaultErrorText = i18n('form', 'arrivalError');
	}

	renderSwitcher() {
		return <div className={'widget-ui-icon widget-form-airports__swap'} title={i18n('form', 'swapAirports')} onClick={this.props.swapAirports}/>;
	}
}

Arrival.propTypes = {
	isLoading: PropTypes.bool,
	suggestions: PropTypes.array,
	sameAirportsError: PropTypes.bool,
	airport: PropTypes.object,
	readOnly: PropTypes.bool,
	isGridMode: PropTypes.bool,
	showErrors: PropTypes.bool.isRequired,
	changeAutocompleteSuggestions: PropTypes.func.isRequired,
	sendAutocompleteRequest: PropTypes.func.isRequired,
	swapAirports: PropTypes.func.isRequired,
	selectAirport: PropTypes.func.isRequired,
	getRef: PropTypes.func.isRequired
};

export default Arrival;
