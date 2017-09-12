import { combineReducers } from 'redux';
import form from 'reducers/form';
import system from 'reducers/system';

export default combineReducers({
	form,
	system
});