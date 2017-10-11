import { createSelector } from 'reselect';
import { getPassengersArray } from 'selectors/passengers';
import { nemoToWebskyPassTypes } from 'reducers/form/passengers';

export const webskyPassengers = createSelector(
	[ getPassengersArray ],
	passengers => passengers
		.filter(passenger => passenger.count)
		.map(passenger => {
			return { ...passenger, code: nemoToWebskyPassTypes[passenger.code] }; 
		})
);