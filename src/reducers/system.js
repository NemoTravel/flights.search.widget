import { LOAD_CONFIG } from 'actions';

const initialState = {
	rootElement: null,
	API_URL: '',
	routingGrid: null,
	locale: 'en',
	showAirportIATA: false,
	readOnlyAutocomplete: false,
	enableInfantsWithSeats: false
};

export default function system(state = initialState, action) {
	switch (action.type) {
		case LOAD_CONFIG:
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