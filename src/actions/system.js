import { types } from 'actions';

export function loadConfig(config) {
	return {
		type: types.LOAD_CONFIG,
		payload: config
	};
}