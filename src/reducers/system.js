import { LOAD_CONFIG } from 'actions';
import { cache } from 'utils';

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
			let resultState = {};
			
			for (let prop in initialState) {
				if (initialState.hasOwnProperty(prop) && newConfig.hasOwnProperty(prop)) {
					newState[prop] = newConfig[prop];
				}
			}

			resultState = { ...state, ...newState };

			// Store current language code in the cache.
			cache('locale', resultState.locale);
			
			return resultState;

		default:
			return state;
	}
}