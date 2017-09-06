import { types } from 'actions';
import { cloneDeep } from 'lodash';

const initialState = {
	API_URL: '',
	airline: null,
	locale: 'en',
	form: {
		hideAirportIATA: false
	}
};

export default function system(state = initialState, action) {
	let newState = null;

	switch (action.type) {
		case types.LOAD_CONFIG:
			const newConfig = action.payload;
			newState = cloneDeep(state);
			
			for (let prop in initialState) {
				if (initialState.hasOwnProperty(prop) && newConfig.hasOwnProperty(prop)) {
					newState[prop] = newConfig[prop];
				}
			}
			
			return newState;

		default:
			return state;
	}
}