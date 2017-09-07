import { combineReducers } from 'redux';
import search from 'reducers/form/search';
import bookings from 'reducers/form/bookings';
import registration from 'reducers/form/registration';
import blockVisibility from 'reducers/form/blockVisibility';

export default combineReducers({
	search,
	registration,
	bookings,
	blockVisibility
});