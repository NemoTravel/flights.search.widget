import { types } from 'actions';

/**
 * Show/hide dropdown blocks on the search form.
 * 
 * @param blockName
 * @returns {Object}
 */
export function toggleBlock(blockName) {
	return {
		type: types.TOGGLE_BLOCK,
		payload: blockName
	}
}