import { createSelector } from 'reselect';
import { getIntermediateDates } from '../../../utils';
import * as moment from 'moment';
import { ApplicationState } from '../../../state';
import { Moment } from 'moment';

const getDepartureDate = (state: ApplicationState): Moment => state.form.dates.departure.date;
const getDepartureAvailableDates = (state: ApplicationState): any => state.form.dates.departure.availableDates;
const getReturnDate = (state: ApplicationState): Moment => state.form.dates.return.date;
const getReturnAvailableDates = (state: ApplicationState): any => state.form.dates.return.availableDates;
const highlightAvailableDates = (state: ApplicationState): boolean => state.system.highlightAvailableDates;

/**
 * Get an array of MomentJS dates between the departure and the return date.
 */
export const getDatesBetweenDepartureAndReturn = createSelector(
	[getDepartureDate, getReturnDate],
	(departureDate?: Moment, returnDate?: Moment): Moment[] => {
		let result: Moment[] = [];

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

export interface HighlightedDatesGroup {
	[className: string]: Moment[];
}

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
const createHighlightedDates = (availableDates: any, intermediateDates: Moment[], highlightAvailableDates: boolean): HighlightedDatesGroup[] => {
	const result: HighlightedDatesGroup[] = [];

	if (highlightAvailableDates && availableDates.length) {
		result.push({
			'react-datepicker__day--hasFlight': availableDates.map(({ date }: any) => moment(date))
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
	[getDepartureAvailableDates, getDatesBetweenDepartureAndReturn, highlightAvailableDates],
	createHighlightedDates
);

export const getReturnHighlightedDates = createSelector(
	[getReturnAvailableDates, getDatesBetweenDepartureAndReturn, highlightAvailableDates],
	createHighlightedDates
);
