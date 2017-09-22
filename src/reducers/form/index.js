import { combineReducers } from 'redux';
import bookings from 'reducers/form/bookings';
import registration from 'reducers/form/registration';
import blockVisibility from 'reducers/form/blockVisibility';
import passengers from 'reducers/form/passengers';
import autocomplete from 'reducers/form/autocomplete';
import dates from 'reducers/form/dates';
import showErrors from 'reducers/form/showErrors';

export default function formReducer(state, action) {
	// Some `form` action handlers goes there.
	
	return combineReducers({
		showErrors,
		registration,
		bookings,
		// blockVisibility,
		dates,
		autocomplete,
		passengers
	})(state, action);
}