import { types } from 'actions';
import { combineReducers } from 'redux';
import passengers from 'reducers/form/search/passengers';

// So, here we have two similar blocks that should be handled with the only one reducer.
// Departure block and the arrival block are absolutely identical, except the fact that
// the arrival block has datepicker disabled by default.
const initialState = {
	isLoading: false,
	isDatepickerActive: true,
	suggestions: [],
	inputValue: '',
	airport: null,
	date: null
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
function departureSearchReducer(state = initialState, action) {
	if (action.payload && action.payload.fieldType === 'departure') {
		return searchReducer(state, action);
	}
	
	return state;
}

/**
 * Note that we set `isDatepickerActive` to `false` in the initial state.
 * 
 * @param state
 * @param action
 * @returns {*}
 */
function arrivalSearchReducer(state = {...initialState, isDatepickerActive: false }, action) {
	if (action.payload && action.payload.fieldType === 'arrival') {
		return searchReducer(state, action);
	}
	
	return state;
}

/**
 * The problem is that these two blocks are driven by identical actions.
 * Every action has a `fieldType` (`arrival` or `departure`) property in it's payload, 
 * so the functions above can decide which reducer to use with the dispatched action.
 * 
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
function searchReducer(state, { type, payload }) {
	switch (type) {
		case types.TOGGLE_DATEPICKER:
			return { ...state, isDatepickerActive: payload.isActive };

		case types.AUTOCOMPLETE_LOADING_STARTED:
			return { ...state, isLoading: true };

		case types.AUTOCOMPLETE_LOADING_FINISHED:
			return { ...state, isLoading: false };

		case types.AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			return { ...state, suggestions: payload.suggestions };

		case types.AUTOCOMPLETE_INPUT_VALUE_CHANGED:
			return { ...state, inputValue: payload.value };

		case types.AIRPORT_SELECTED:
			return { ...state, airport: payload.airport };

		case types.DATE_SELECTED:
			return { ...state, date: payload.date };

		// case types.SWITCH_AIRPORTS:
		// 	const departureAirport = state.departure.airport;
		// 	const arrivalAirport = state.arrival.airport;
		//
		// 	if (departureAirport || arrivalAirport) {
		// 		const { departure:departureField } = state;
		// 		const { arrival:arrivalField } = state;
		//
		// 		const departureInpurtValue = departureField.inputValue;
		// 		const arrivalInpurtValue = arrivalField.inputValue;
		//
		// 		departureField.airport = arrivalAirport;
		// 		arrivalField.airport = departureAirport;
		//
		// 		departureField.inputValue = arrivalInpurtValue;
		// 		arrivalField.inputValue = departureInpurtValue;
		//
		// 		return { ...state, departure: departureField, arrival: arrivalField };
		// 	}
		//
		// 	return state;
	}

	return state;
}

export default combineReducers({
	departure: departureSearchReducer,
	arrival: arrivalSearchReducer,
	passengers
});