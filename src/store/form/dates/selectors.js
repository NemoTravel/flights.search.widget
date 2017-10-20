import { createSelector } from 'reselect';
import { getIntermediateDates } from 'utils';
import moment from 'moment';

const getDepartureDate = state => state.form.dates.departure.date;
const getDepartureAvailableDates = state => state.form.dates.departure.availableDates;
const getReturnDate = state => state.form.dates.return.date;
const getReturnAvailableDates = state => state.form.dates.return.availableDates;
const highlightAvailableDates = state => state.system.highlightAvailableDates;

/**
 * Get an array of MomentJS dates between the departure and the return date.
 */
export const getDatesBetweenDepartureAndReturn = createSelector(
	[ getDepartureDate, getReturnDate ],
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

/**
 * Join two arrays:
 * - dates with available flights
 * - dates between departure and arrival
 * 
 * @param {Array} availableDates
 * @param {Array} intermediateDates
 * @param {Boolean} highlightAvailableDates
 * @returns {Array}
 */
const createHighlightedDates = (availableDates, intermediateDates, highlightAvailableDates) => {
	let result = [];
	
	if (highlightAvailableDates && availableDates.length) {
		result.push({
			'react-datepicker__day--hasFlight': availableDates.map(({date}) => moment(date))
		});
	}

	if (intermediateDates.length) {
		result.push({
			'react-datepicker__day--highlighted': intermediateDates
		});
	}
	
	return result;
};

export const getDepartureHighlightedDates = createSelector(
	[ getDepartureAvailableDates, getDatesBetweenDepartureAndReturn, highlightAvailableDates ],
	createHighlightedDates
);

export const getReturnHighlightedDates = createSelector(
	[ getReturnAvailableDates, getDatesBetweenDepartureAndReturn, highlightAvailableDates ],
	createHighlightedDates
);