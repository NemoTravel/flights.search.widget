import { LOAD_CONFIG } from 'actions';
import moment from 'moment';
import { selectDate, toggleDatePicker } from 'actions/dates';
import { selectAirport, changeAutocompleteInputValue } from 'actions/autocomplete';
import { setCounter } from 'actions/passengers';

export function loadConfig(config) {
	return {
		type: LOAD_CONFIG,
		payload: config
	};
}

export function processInitialState(oldState) {
	return (dispatch, getState) => {
		const currentState = getState();

		if (oldState) {
			// Check if language has been changed.
			const canBeProcessed = oldState.system.locale === currentState.system.locale;
			
			if (oldState.form.dates.departure.date) {
				dispatch(toggleDatePicker(true, 'departure'));
				dispatch(selectDate(moment(oldState.form.dates.departure.date), 'departure'));
			}

			if (oldState.form.dates.return.date) {
				dispatch(toggleDatePicker(true, 'return'));
				dispatch(selectDate(moment(oldState.form.dates.return.date), 'return'));
			}

			if (canBeProcessed && oldState.form.autocomplete.departure.airport) {
				dispatch(changeAutocompleteInputValue(oldState.form.autocomplete.departure.inputValue, 'departure'));
				dispatch(selectAirport(oldState.form.autocomplete.departure.airport, 'departure'));
			}

			if (canBeProcessed && oldState.form.autocomplete.arrival.airport) {
				dispatch(changeAutocompleteInputValue(oldState.form.autocomplete.arrival.inputValue, 'arrival'));
				dispatch(selectAirport(oldState.form.autocomplete.arrival.airport, 'arrival'));
			}
			
			if (oldState.form.passengers) {
				for (const passType in oldState.form.passengers) {
					if (oldState.form.passengers.hasOwnProperty(passType)) {
						const counter = oldState.form.passengers[passType].count;
						dispatch(setCounter(counter, passType));
					}
				}
			}
		}
	}
}