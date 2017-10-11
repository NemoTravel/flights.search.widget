import { createSelector } from 'reselect';
import { getIntermediateDates } from 'utils';

function getDepartureDate(state) {
	return state.form.dates.departure.date;
}

function getReturnDate(state) {
	return state.form.dates.return.date;
}

/**
 * Get an array of MomentJS dates between the departure and the return date.
 */
export const getDatesBetweenDepartureAndReturn = createSelector(
	[getDepartureDate, getReturnDate],
	(departureDate, returnDate) => {
		let result = [];

		if (departureDate && returnDate) {
			result = getIntermediateDates(departureDate, returnDate, true);
		}
		else if (departureDate) {
			result.push(departureDate);
		}
		else if (returnDate) {
			result.push(returnDate);
		}

		return result;
	}
);