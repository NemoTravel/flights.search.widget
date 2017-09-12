import { types } from 'actions';
import { selectAirport, changeAutocompleteInputValue } from 'actions/autocomplete';

/**
 * This action changes two different state trees (departure and arrival blocks),
 * so we had to move it to the middleware.
 * 
 * @param store
 */
export const switchAirports = (store) => (next) => (action) => {
	if (action.type === types.SWITCH_AIRPORTS) {
		const 
			state = store.getState(),
			departureAirport = state.form.autocomplete.departure.airport,
			arrivalAirport = state.form.autocomplete.arrival.airport;

		if (departureAirport || arrivalAirport) {
			const 
				departureInputValue = state.form.autocomplete.departure.inputValue,
				arrivalInputValue = state.form.autocomplete.arrival.inputValue;

			next(selectAirport(departureAirport, 'arrival'));
			next(selectAirport(arrivalAirport, 'departure'));

			next(changeAutocompleteInputValue(departureInputValue, 'arrival'));
			next(changeAutocompleteInputValue(arrivalInputValue, 'departure'));
		}

		next(action);
	}
	else {
		next(action);
	}
};