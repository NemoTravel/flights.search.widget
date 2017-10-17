import { combineReducers } from 'redux';
import form from 'store/form/reducer';
import system from 'store/system/reducer';

export default combineReducers({
	form,
	system
});