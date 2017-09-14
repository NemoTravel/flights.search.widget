import { TOGGLE_BLOCK, SHOW_ERRORS } from 'actions';
import { formIsValid } from 'selectors';

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

export function showErrors(showErrors) {
	return {
		type: SHOW_ERRORS,
		payload: showErrors
	};
}

/**
 * Starting search:
 * - run validation
 * - do some optional checks
 * - run search itself
 * 
 * @returns {Object}
 */
export function startSearch() {
	return (dispatch, getState) => {
		const state = getState();
		
		if (formIsValid(state)) {
			alert('ALL IS FINE');
		}
		else {
			dispatch(showErrors(true));
		}
	};
}