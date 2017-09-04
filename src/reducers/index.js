import { combineReducers } from 'redux';
import form from 'reducers/form';

/**
 * Get all reducers and combine them into the single one.
 */
export default combineReducers({
	form
});