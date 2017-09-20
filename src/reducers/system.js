import { LOAD_CONFIG } from 'actions';
import { cache } from 'utils';
import { system } from 'state';

export function processConfig(state, config) {
	let resultState = { ...state, ...config };

	// Store current language code in the cache.
	cache('locale', resultState.locale);

	return resultState;
}

export default function(state = system, action) {
	switch (action.type) {
		case LOAD_CONFIG:
			return processConfig(state, action.payload);

		default:
			return state;
	}
}