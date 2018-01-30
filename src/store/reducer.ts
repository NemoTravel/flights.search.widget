import { combineReducers } from 'redux';
import form from './form/reducer';
import system from './system/reducer';
import { ApplicationState } from '../state';

export default combineReducers<ApplicationState>({
	form,
	system
});
