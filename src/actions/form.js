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

export function selectDate(date, fieldType) {
	return {
		type: types.DATE_SELECTED,
		payload: {
			fieldType,
			date
		}
	};
}

export function toggleDatePicker(isActive, fieldType) {
	return {
		type: types.TOGGLE_DATEPICKER,
		payload: {
			fieldType,
			isActive
		}
	};
}