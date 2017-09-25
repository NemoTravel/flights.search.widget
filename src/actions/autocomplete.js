import { 
	AUTOCOMPLETE_LOADING_STARTED, 
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AUTOCOMPLETE_INPUT_VALUE_CHANGED,
	AIRPORT_SELECTED
} from 'actions';

/**
 * Change the departure and the arrival airports.
 */
export function switchAirports() {
	return (dispatch, getState) => {
		const
			state = getState(),
			departureAirport = state.form.autocomplete.departure.airport,
			arrivalAirport = state.form.autocomplete.arrival.airport;

		if (departureAirport || arrivalAirport) {
			const
				departureInputValue = departureAirport ? departureAirport.name : state.form.autocomplete.departure.inputValue,
				arrivalInputValue = arrivalAirport ? arrivalAirport.name : state.form.autocomplete.arrival.inputValue;

			dispatch(selectAirport(departureAirport, 'arrival'));
			dispatch(selectAirport(arrivalAirport, 'departure'));

			dispatch(changeAutocompleteInputValue(departureInputValue, 'arrival'));
			dispatch(changeAutocompleteInputValue(arrivalInputValue, 'departure'));
		}
	};
}

export function startAutocompleteLoading(autocompleteType) {
	return {
		type: AUTOCOMPLETE_LOADING_STARTED,
		autocompleteType
	};
}

export function finishAutocompleteLoading(autocompleteType) {
	return {
		type: AUTOCOMPLETE_LOADING_FINISHED,
		autocompleteType
	};
}

export function changeAutocompleteSuggestions(suggestions, autocompleteType) {
	return {
		type: AUTOCOMPLETE_SUGGESTIONS_CHANGED,
		autocompleteType,
		payload: {
			suggestions
		}
	};
}

export function changeAutocompleteInputValue(value, autocompleteType) {
	return {
		type: AUTOCOMPLETE_INPUT_VALUE_CHANGED,
		autocompleteType,
		payload: {
			value
		}
	};
}

export function selectAirport(airport, autocompleteType) {
	return {
		type: AIRPORT_SELECTED,
		autocompleteType,
		payload: {
			airport
		}
	};
}

export function sendAutocompleteRequest(searchText, autocompleteType) {
	return (dispatch, getState) => {
		const state = getState();

		dispatch(startAutocompleteLoading(autocompleteType));

		let url = `${state.system.API_URL}/guide/autocomplete/iata/${searchText}`;
		
		if (autocompleteType === 'departure') {
			if (state.form.autocomplete.arrival.airport) {
				url += `/arr/${state.form.autocomplete.arrival.airport.IATA}`;
			}
		}
		else {
			if (state.form.autocomplete.departure.airport) {
				url += `/dep/${state.form.autocomplete.departure.airport.IATA}`;
			}
		}

		if (state.system.routingGrid) {
			url += `?airlineIATA=${state.system.routingGrid}&apilang=${state.system.locale}`;
		}
		else {
			url += `?apilang=${state.system.locale}`;
		}

		fetch(url)
			.then(response => response.json())
			.then(response => {
				const data = response;
				
				// Some basic parser.
				if (data && data.guide.autocomplete.iata instanceof Array) {
					const { airports } = data.guide;
					const { iata } = data.guide.autocomplete;
					// Trying to match suggested airports by IATA.
					const suggestions = iata.filter(({ IATA }) => IATA in airports && airports[IATA].name).map(({ IATA }) => airports[IATA]);
	
					// Clear previous suggestions first (to avoid rendering collisions).
					dispatch(changeAutocompleteSuggestions([], autocompleteType));
					dispatch(changeAutocompleteSuggestions(suggestions, autocompleteType));
					dispatch(finishAutocompleteLoading(autocompleteType));
				}
				else {
					dispatch(finishAutocompleteLoading(autocompleteType));
				}
			})
			.catch(() => {
				dispatch(changeAutocompleteSuggestions([], autocompleteType));
				dispatch(finishAutocompleteLoading(autocompleteType));
			});
	};
}