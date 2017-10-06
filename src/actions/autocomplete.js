import { 
	AUTOCOMPLETE_LOADING_STARTED, 
	AUTOCOMPLETE_LOADING_FINISHED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	AIRPORT_SELECTED
} from 'actions';

/**
 * Change the departure and the arrival airports.
 */
export function swapAirports() {
	return (dispatch, getState) => {
		const
			state = getState(),
			departureAirport = state.form.autocomplete.departure.airport,
			arrivalAirport = state.form.autocomplete.arrival.airport;

		if (departureAirport || arrivalAirport) {
			dispatch(selectAirport(departureAirport, 'arrival'));
			dispatch(selectAirport(arrivalAirport, 'departure'));
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

		if (autocompleteType === 'arrival' && state.form.autocomplete.departure.airport) {
			url += `/dep/${state.form.autocomplete.departure.airport.IATA}`;
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
					const { airports, countries } = data.guide;
					const { iata } = data.guide.autocomplete;
					
					// Trying to match suggested airports by IATA.
					const suggestions = iata
						.filter(({ IATA }) => IATA in airports && airports[IATA].name)
						.map(({ IATA, directFlight }) => {
							return {
								value: {
									airport: airports[IATA],
									country: countries[airports[IATA].countryCode],
									isDirect: directFlight
								},
								label: airports[IATA].name + airports[IATA].nameEn + airports[IATA].IATA
							};
						});
	
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