import { Action } from 'redux';
import { ENABLE_CACHING, LOAD_CONFIG } from '../actions';
import * as Cache from '../../cache';
import { SystemState, systemState } from '../../state';

interface SystemAction extends Action {
	payload: SystemState;
}

export const configReducer = (state: SystemState, newConfig: SystemState): SystemState => {
	const resultState = { ...state, ...newConfig };

	// Store current language code in the cache.
	Cache.set(Cache.KEY_LOCALE, resultState.locale);

	return resultState;
};

export default (state: SystemState = systemState, action: SystemAction): SystemState => {
	switch (action.type) {
		case LOAD_CONFIG:
			return configReducer(state, action.payload);

		case ENABLE_CACHING:
			return {...state, disableCaching: false};

		default:
			return state;
	}
};
