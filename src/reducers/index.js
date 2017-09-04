import { combineReducers } from 'redux';
import form from 'reducers/form';
import system from 'reducers/system';

/**
 * Get all reducers and combine them into the single one.
 */
export default combineReducers({
	form,
	system
});