import { types } from 'actions';

const initialState = {
	API_URL: '',
	routingGrid: null,
	locale: 'en',
	form: {
		showAirportIATA: false,
		readOnlyAutocomplete: false
	}
};

export default function system(state = initialState, action) {
	switch (action.type) {
		case types.LOAD_CONFIG:
			const newConfig = action.payload;
			const newState = {};
			
			for (let prop in initialState) {
				if (initialState.hasOwnProperty(prop) && newConfig.hasOwnProperty(prop)) {
					newState[prop] = newConfig[prop];
				}
			}
			
			return { ...state, ...newState };

		default:
			return state;
	}
}