import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as autocompleteActions from 'actions/autocomplete';
import DepartureAutocomplete from 'components/VerticalForm/Block/Search/Autocomplete/Departure';
import ArrivalAutocomplete from 'components/VerticalForm/Block/Search/Autocomplete/Arrival';

class AutocompleteContainer extends Component {
	constructor(props) {
		super(props);
		
		this.getArrivalRef = this.getArrivalRef.bind(this);
	}
	
	getArrivalRef(input) { 
		this.arrivalInput = input; 
	}
	
	render() {
		const { departureAutocomplete, arrivalAutocomplete, system, showErrors } = this.props;
		let originalSelectAirport = this.props.actions.selectAirport;
		
		// Focus arrival autocomplete field after selecting the departure airport.
		const selectAirport = (airport, autocompleteType) => {
			originalSelectAirport(airport, autocompleteType);
			
			if (autocompleteType === 'departure' && !arrivalAutocomplete.airport) {
				this.arrivalInput.focus();
			}
		};
		
		const actions = { ...this.props.actions, selectAirport };
		
		return <div className="form-group">
			<DepartureAutocomplete showErrors={showErrors} state={departureAutocomplete} system={system} {...actions}/>
			<ArrivalAutocomplete showErrors={showErrors} state={arrivalAutocomplete} system={system} {...actions} getRef={this.getArrivalRef}/>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		departureAutocomplete: state.form.autocomplete.departure,
		arrivalAutocomplete: state.form.autocomplete.arrival,
		showErrors: state.form.showErrors,
		system: state.system
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(autocompleteActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(AutocompleteContainer);