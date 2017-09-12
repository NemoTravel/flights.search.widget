import { combineReducers } from 'redux';
import form from 'reducers/form';
import system from 'reducers/system';

/**
 * Sometimes you have a set of objects with the same state structure,
 * driven by the same actions and controlled by the same reducers.
 * But most likely these objects will have different IDs/types and you won't be able to easily handle actions.
 * 
 * This function allows you to call the given reducer only when you need it to:
 * when the dispatched action has a proper `objectType` value.
 *
 * Usage example:
 * @see src/actions/dates.js
 * @see src/reducers/form/dates.js
 * 
 * @param {String} objectType
 * @param {Function} reducer
 * @param {Object} defaultState
 * @returns {Function}
 */
export function filterReducer(objectType, reducer, defaultState) {
	return (state = defaultState, action) => {
		return action.payload && action.payload.objectType === objectType ? reducer(state, action) : state
	};
}

export default combineReducers({
	form,
	system
});