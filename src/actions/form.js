import { TOGGLE_BLOCK } from 'actions';

/**
 * Show/hide dropdown blocks on the search form.
 * 
 * @param blockName
 * @returns {Object}
 */
export function toggleBlock(blockName) {
	return {
		type: TOGGLE_BLOCK,
		payload: blockName
	}
}