import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as autocompleteActions from 'actions/autocomplete';
import DepartureAutocomplete from 'components/Form/Search/Autocomplete/Departure';
import ArrivalAutocomplete from 'components/Form/Search/Autocomplete/Arrival';
import { getDepartureOptions, getArrivalOptions } from 'selectors/form';
import { MODE_WEBSKY } from 'state';

class AutocompleteContainer extends Component {
	render() {
		let sameAirportsError = false;
		
		const { 
			departureAutocomplete, 
		  	arrivalAutocomplete, 
		  	system, 
		  	showErrors, 
		  	departureOptions, 
		  	arrivalOptions 
		} = this.props;
		
		const {
			swapAirports,
			changeAutocompleteSuggestions,
			sendAutocompleteRequest,
			selectAirport 
		} = this.props.actions;
		
		if (
			departureAutocomplete.airport && arrivalAutocomplete.airport &&
			departureAutocomplete.airport.IATA === arrivalAutocomplete.airport.IATA
		) {
			sameAirportsError = true;
		}
		
		return <div className="form-group row widget-form-airports">
			<DepartureAutocomplete
				showErrors={showErrors}
				sameAirportsError={sameAirportsError}
				isLoading={departureAutocomplete.isLoading}
				suggestions={departureOptions}
				airport={departureAutocomplete.airport}
				swapAirports={swapAirports}
				changeAutocompleteSuggestions={changeAutocompleteSuggestions}
				sendAutocompleteRequest={sendAutocompleteRequest}
				isGridMode={system.routingGrid || system.mode === MODE_WEBSKY}
				readOnly={system.readOnlyAutocomplete}
				selectAirport={(airport, autocompleteType) => {
					selectAirport(airport, autocompleteType);

					if (system.autoFocusArrivalAirport && this.arrivalInput) {
						this.arrivalInput.focus();
					}
				}}
			/>
			
			<ArrivalAutocomplete
				showErrors={showErrors}
				sameAirportsError={sameAirportsError}
				isLoading={arrivalAutocomplete.isLoading}
				suggestions={arrivalOptions}
				airport={arrivalAutocomplete.airport}
				swapAirports={swapAirports}
				changeAutocompleteSuggestions={changeAutocompleteSuggestions}
				sendAutocompleteRequest={sendAutocompleteRequest}
				selectAirport={selectAirport}
				isGridMode={system.routingGrid || system.mode === MODE_WEBSKY}
				readOnly={system.readOnlyAutocomplete}
				getRef={(input) => this.arrivalInput = input}
			/>
		</div>
	}
}

export default connect(
	state => {
		return {
			departureAutocomplete: state.form.autocomplete.departure,
			arrivalAutocomplete: state.form.autocomplete.arrival,
			departureOptions: getDepartureOptions(state),
			arrivalOptions: getArrivalOptions(state),
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