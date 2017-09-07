import { types } from 'actions';

const initialState = {
	departure: {
		isLoading: false,
		isDatepickerActive: true,
		suggestions: [],
		inputValue: '',
		airport: null,
		date: null
	},
	arrival: {
		isLoading: false,
		isDatepickerActive: false,
		suggestions: [],
		inputValue: '',
		airport: null,
		date: null
	}
};

export default function searchReducer(state = initialState, action) {
	let field, fieldType;
	
	switch (action.type) {
		case types.TOGGLE_DATEPICKER:
			fieldType = action.payload.fieldType;
			field = state[fieldType];
			field.isDatepickerActive = action.payload.isActive;
			return { ...state, fieldType: field };

		case types.AUTOCOMPLETE_LOADING_STARTED:
			fieldType = action.payload;
			field = state[fieldType];
			field.isLoading = true;
			return { ...state, fieldType: field };

		case types.AUTOCOMPLETE_LOADING_FINISHED:
			fieldType = action.payload;
			field = state[fieldType];
			field.isLoading = false;
			return { ...state, fieldType: field };

		case types.AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			fieldType = action.payload.fieldType;
			field = state[fieldType];
			field.suggestions = action.payload.suggestions;
			return { ...state, fieldType: field };

		case types.AUTOCOMPLETE_INPUT_VALUE_CHANGED:
			fieldType = action.payload.fieldType;
			field = state[fieldType];
			field.inputValue = action.payload.value;
			return { ...state, fieldType: field };

		case types.AIRPORT_SELECTED:
			fieldType = action.payload.fieldType;
			field = state[fieldType];
			field.airport = action.payload.airport;
			return { ...state, fieldType: field };

		case types.DATE_SELECTED:
			fieldType = action.payload.fieldType;
			field = state[fieldType];
			field.date = action.payload.date;
			return { ...state, fieldType: field };

		case types.SWITCH_AIRPORTS:
			const departureAirport = state.departure.airport;
			const arrivalAirport = state.arrival.airport;

			if (departureAirport || arrivalAirport) {
				const { departure:departureField } = state;
				const { arrival:arrivalField } = state;

				const departureInpurtValue = departureField.inputValue;
				const arrivalInpurtValue = arrivalField.inputValue;

				departureField.airport = arrivalAirport;
				arrivalField.airport = departureAirport;

				departureField.inputValue = arrivalInpurtValue;
				arrivalField.inputValue = departureInpurtValue;

				return { ...state, departure: departureField, arrival: arrivalField };
			}

			return state;
	}

	return state;
}