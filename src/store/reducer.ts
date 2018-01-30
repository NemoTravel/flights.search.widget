import { combineReducers } from 'redux';
import form from './form/reducer';
import system from './system/reducer';

export default combineReducers({
	form,
	system
});
