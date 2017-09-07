import { combineReducers } from 'redux';
import search from 'reducers/form/search';
import bookings from 'reducers/form/bookings';
import registration from 'reducers/form/registration';

export default combineReducers({
	search,
	registration,
	bookings
});