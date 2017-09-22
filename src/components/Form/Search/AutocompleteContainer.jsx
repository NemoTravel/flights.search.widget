import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as autocompleteActions from 'actions/autocomplete';
import DepartureAutocomplete from 'components/Form/Search/Autocomplete/Departure';
import ArrivalAutocomplete from 'components/Form/Search/Autocomplete/Arrival';

class AutocompleteContainer extends Component {
	constructor(props) {
		super(props);
		
		this.getArrivalRef = this.getArrivalRef.bind(this);
		this.selectAirportWrapper = this.selectAirportWrapper.bind(this);
	}
	
	getArrivalRef(input) { 
		this.arrivalInput = input; 
	}

	/**
	 * Focus arrival autocomplete field after selecting the departure airport.
	 * 
	 * @returns {Function}
	 */
	selectAirportWrapper() {
		const originalSelectAirport = this.props.actions.selectAirport;
		
		return (airport, autocompleteType) => {
			originalSelectAirport(airport, autocompleteType);

			if (autocompleteType === 'departure' && !this.props.arrivalAutocomplete.airport) {
				this.arrivalInput.focus();
			}
		}
	}
	
	render() {
		const { departureAutocomplete, arrivalAutocomplete, system, showErrors } = this.props;
		
		return <div className="form-group row widget-form-airports">
			<DepartureAutocomplete
				system={system}
				showErrors={showErrors} 
				{...departureAutocomplete}
				{...this.props.actions}
				selectAirport={this.selectAirportWrapper()}
			/>
			
			<ArrivalAutocomplete
				system={system}
				showErrors={showErrors}
				{...arrivalAutocomplete}
				{...this.props.actions} 
				selectAirport={this.selectAirportWrapper()}
				getRef={this.getArrivalRef}
			/>
		</div>
	}
}

export default connect(
	state => {
		return {
			departureAutocomplete: state.form.autocomplete.departure,
			arrivalAutocomplete: state.form.autocomplete.arrival,
			showErrors: state.form.showErrors,
			system: state.system
		};
	}, 
	dispatch => {
		return {
			actions: bindActionCreators(autocompleteActions, dispatch)
		};
	}
)(AutocompleteContainer);