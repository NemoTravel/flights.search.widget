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
			departureAirport = state.form.search.departure.airport,
			arrivalAirport = state.form.search.arrival.airport;

		if (departureAirport || arrivalAirport) {
			const 
				departureInputValue = state.form.search.departure.inputValue,
				arrivalInputValue = state.form.search.arrival.inputValue;

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