import { SHOW_ERRORS } from 'actions';
import { combineReducers } from 'redux';
import passengers from 'store/form/passengers/reducer';
import autocomplete from 'store/form/autocomplete/reducer';
import dates from 'store/form/dates/reducer';

export default function(state, action) {
	// Some `form` action handlers goes there.
	
	return combineReducers({
		showErrors: (state = false, { type, payload }) => type === SHOW_ERRORS ? payload : state,
		dates,
		autocomplete,
		passengers
	})(state, action);
}