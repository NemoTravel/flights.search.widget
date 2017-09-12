import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as autocompleteActions from 'actions/autocomplete';
import DepartureAutocomplete from 'components/VerticalForm/Block/Search/Autocomplete/Departure';
import ArrivalAutocomplete from 'components/VerticalForm/Block/Search/Autocomplete/Arrival';

class AutocompleteContainer extends Component {
	render() {
		const { departureAutocomplete, arrivalAutocomplete, system } = this.props;
		
		return <div className="form-group">
			<DepartureAutocomplete state={departureAutocomplete} system={system} {...this.props.actions}/>
			<ArrivalAutocomplete state={arrivalAutocomplete} system={system} {...this.props.actions}/>
		</div>;
	}
}

function mapStateToProps(state) {
	return {
		departureAutocomplete: state.form.search.departure,
		arrivalAutocomplete: state.form.search.arrival,
		system: state.system
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(autocompleteActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(AutocompleteContainer);