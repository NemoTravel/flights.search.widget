import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import {
	changeAutocompleteSuggestions,
	selectAirport,
	sendAutocompleteRequest,
	swapAirports, AutocompleteAction
} from '../../../store/form/segments/autocomplete/actions';

import DepartureAutocomplete from './Autocomplete/Departure';
import ArrivalAutocomplete from './Autocomplete/Arrival';
import { getDefaultOptionsGroup, DefaultOptionGroup, getSuggestionOptions } from '../../../store/form/selectors';
import {
	ApplicationMode, ApplicationState, AutocompleteFieldState, AutocompleteFieldType, CommonThunkAction, SegmentState,
	SystemState
} from '../../../state';

interface StateProps {
	defaultOptionsGroup: DefaultOptionGroup[];
	showErrors: boolean;
	system: SystemState;
}

interface DispatchProps {
	selectAirport: (airport: any, autocompleteType: AutocompleteFieldType, segmentId: number) => CommonThunkAction;
	sendAutocompleteRequest: (searchText: string, autocompleteType: AutocompleteFieldType, segmentId: number) => CommonThunkAction;
	changeAutocompleteSuggestions: (suggestions: any[], autocompleteType: AutocompleteFieldType) => AutocompleteAction;
	swapAirports: (segmentId: number) => CommonThunkAction;
}

interface Props {
	segmentId: number;
	departureAutocomplete: AutocompleteFieldState;
	arrivalAutocomplete: AutocompleteFieldState;
}

class AutocompleteContainer extends React.Component<StateProps & DispatchProps & Props> {
	protected arrivalInput: HTMLInputElement = null;

	render(): React.ReactNode {
		let sameAirportsError = false;

		const {
			departureAutocomplete,
			defaultOptionsGroup,
			arrivalAutocomplete,
			system,
			showErrors,

			swapAirports,
			changeAutocompleteSuggestions,
			sendAutocompleteRequest,
			selectAirport,
			segmentId
		} = this.props;

		const departureOptions = getSuggestionOptions(departureAutocomplete);
		const arrivalOptions = getSuggestionOptions(arrivalAutocomplete);

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
				segmentId={segmentId}
				optionsGroup={defaultOptionsGroup}
				airport={departureAutocomplete.airport}
				swapAirports={swapAirports}
				changeAutocompleteSuggestions={changeAutocompleteSuggestions}
				sendAutocompleteRequest={sendAutocompleteRequest}
				isGridMode={!!system.routingGrid || system.mode === ApplicationMode.WEBSKY}
				readOnly={system.readOnlyAutocomplete}
				selectAirport={(airport: any, autocompleteType: AutocompleteFieldType, segmentId: number): void => {
					selectAirport(airport, autocompleteType, segmentId);

					if (system.autoFocusArrivalAirport && this.arrivalInput) {
						this.arrivalInput.focus();
					}
				}}
			/>

			<ArrivalAutocomplete
				showErrors={showErrors}
				sameAirportsError={sameAirportsError}
				segmentId={segmentId}
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
				getRef={(reactSelect: any): void => reactSelect ? (this.arrivalInput = reactSelect.input) : null}
			/>
		</div>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
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
