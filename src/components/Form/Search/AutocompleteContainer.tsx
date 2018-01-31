import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import {
	changeAutocompleteSuggestions,
	selectAirport,
	sendAutocompleteRequest,
	swapAirports, AutocompleteAction
} from '../../../store/form/autocomplete/actions';
import DepartureAutocomplete from './Autocomplete/Departure';
import ArrivalAutocomplete from './Autocomplete/Arrival';
import {
	getDepartureOptions, getArrivalOptions, getDefaultOptionsGroup,
	DefaultOptionGroup
} from '../../../store/form/selectors';
import {
	ApplicationMode, ApplicationState, AutocompleteFieldState, AutocompleteFieldType, CommonThunkAction,
	SystemState
} from '../../../state';

interface StateProps {
	departureAutocomplete: AutocompleteFieldState;
	arrivalAutocomplete: AutocompleteFieldState;
	departureOptions: any[];
	arrivalOptions: any[];
	defaultOptionsGroup: DefaultOptionGroup[];
	showErrors: boolean;
	system: SystemState;
}

interface DispatchProps {
	selectAirport: (airport: any, autocompleteType: AutocompleteFieldType) => CommonThunkAction;
	sendAutocompleteRequest: (searchText: string, autocompleteType: AutocompleteFieldType) => CommonThunkAction;
	changeAutocompleteSuggestions: (suggestions: any[], autocompleteType: AutocompleteFieldType) => AutocompleteAction;
	swapAirports: () => CommonThunkAction;
}

class AutocompleteContainer extends React.Component<StateProps & DispatchProps> {
	render() {
		let sameAirportsError = false;

		const {
			departureAutocomplete,
			defaultOptionsGroup,
			arrivalAutocomplete,
			system,
			showErrors,
			departureOptions,
			arrivalOptions,

			swapAirports,
			changeAutocompleteSuggestions,
			sendAutocompleteRequest,
			selectAirport
		} = this.props;

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
				optionsGroup={defaultOptionsGroup}
				airport={departureAutocomplete.airport}
				swapAirports={swapAirports}
				changeAutocompleteSuggestions={changeAutocompleteSuggestions}
				sendAutocompleteRequest={sendAutocompleteRequest}
				isGridMode={!!system.routingGrid || system.mode === ApplicationMode.WEBSKY}
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
				optionsGroup={defaultOptionsGroup}
				airport={arrivalAutocomplete.airport}
				swapAirports={swapAirports}
				changeAutocompleteSuggestions={changeAutocompleteSuggestions}
				sendAutocompleteRequest={sendAutocompleteRequest}
				selectAirport={selectAirport}
				isGridMode={!!system.routingGrid || system.mode === ApplicationMode.WEBSKY}
				readOnly={system.readOnlyAutocomplete}
				getRef={reactSelect => reactSelect ? (this.arrivalInput = reactSelect.input) : null}
			/>
		</div>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		departureAutocomplete: state.form.autocomplete.departure,
		arrivalAutocomplete: state.form.autocomplete.arrival,
		departureOptions: getDepartureOptions(state),
		arrivalOptions: getArrivalOptions(state),
		defaultOptionsGroup: getDefaultOptionsGroup(state),
		showErrors: state.form.showErrors,
		system: state.system
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		changeAutocompleteSuggestions: bindActionCreators(changeAutocompleteSuggestions, dispatch),
		selectAirport: bindActionCreators(selectAirport, dispatch),
		sendAutocompleteRequest: bindActionCreators(sendAutocompleteRequest, dispatch),
		swapAirports: bindActionCreators(swapAirports, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(AutocompleteContainer);
