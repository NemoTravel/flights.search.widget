import { createSelector } from 'reselect';
import { getPassengersArray } from 'selectors/passengers';
import { nemoToWebskyPassTypes } from 'store/form/passengers/reducer';

export const webskyPassengers = createSelector(
	[ getPassengersArray ],
	passengers => passengers
		.filter(passenger => passenger.count)
		.map(passenger => {
			return { ...passenger, code: nemoToWebskyPassTypes[passenger.code] }; 
		})
);