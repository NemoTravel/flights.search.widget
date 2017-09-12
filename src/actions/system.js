import { LOAD_CONFIG } from 'actions';

export function loadConfig(config) {
	return {
		type: LOAD_CONFIG,
		payload: config
	};
}