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