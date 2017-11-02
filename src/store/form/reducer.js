import { SHOW_ERRORS } from 'store/actions';
import { combineReducers } from 'redux';
import passengers from 'store/form/passengers/reducer';
import autocomplete from 'store/form/autocomplete/reducer';
import dates from 'store/form/dates/reducer';

export const showErrorsReducer = (state = false, { type, payload } = {}) => {
	return type === SHOW_ERRORS ? payload : state;
};

export default function(state, action) {
	// Some `form` action handlers goes there.

	return combineReducers({
		showErrors: showErrorsReducer,
		dates,
		autocomplete,
		passengers
	})(state, action);
}
