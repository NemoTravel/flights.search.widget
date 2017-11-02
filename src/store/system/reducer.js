import { LOAD_CONFIG } from 'store/actions';
import * as Cache from 'cache';
import { systemState } from 'state';

export const configReducer = (state, newConfig) => {
	const resultState = { ...state, ...newConfig };

	// Store current language code in the cache.
	Cache.set(Cache.KEY_LOCALE, resultState.locale);

	return resultState;
};

export default (state = systemState, action = {}) => {
	switch (action.type) {
		case LOAD_CONFIG:
			return configReducer(state, action.payload);

		default:
			return state;
	}
};
