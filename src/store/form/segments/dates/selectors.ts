import { createSelector } from 'reselect';
import { getIntermediateDates } from '../../../../utils';
import * as moment from 'moment';
import { ApplicationState, FormState } from '../../../../state';
import { Moment } from 'moment';
import { isCR, getForm, isRT } from '../../selectors';

const getDepartureAvailableDates = (state: ApplicationState): any => state.form.segments[0].date.availableDates;
const getReturnDate = (state: ApplicationState): Moment => isRT(state) ? state.form.segments[1].date.date : null;
const getReturnAvailableDates = (state: ApplicationState): any => state.form.segments[0].date.availableDates;
const highlightAvailableDates = (state: ApplicationState): boolean => state.system.highlightAvailableDates;

const getDepartureDates = createSelector(
	[getForm, isCR],
	(form: FormState, isCR: boolean): Moment[] => {
		if (!isCR) {
			return [form.segments[0].date.date];
		}

		return form.segments.map(segment => {
			return segment.date.date;
		});
	}
);

/**
 * Get an array of MomentJS dates between the departure and the return date (for simple trip),
 * or dates between first and last departure dates (for complex route).
 */
export const getDatesBetweenDepartureAndReturn = createSelector(
	[getDepartureDates, getReturnDate, isCR],
	(departureDates?: Moment[], returnDate?: Moment, isCR?: boolean): Moment[] => {
		let result: Moment[] = [];

		if (isCR && departureDates) {
			let lastDepartureDate: Moment = null;

			departureDates.forEach(date => {
				if (date) {
					lastDepartureDate = date;
				}
			});

			result = getIntermediateDates(departureDates[0], lastDepartureDate);
		}
		else {
			if (departureDates) {
				if (returnDate) {
					result = getIntermediateDates(departureDates[0], returnDate, true);
				}
				else {
					result.push(departureDates[0]);
				}
			}
			else if (returnDate) {
				result.push(returnDate);
			}
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
 * - departure dates for complex trip
 *
 * @param {Array} availableDates
 * @param {Array} intermediateDates
 * @param {Boolean} highlightAvailableDates
 * @param {Array} departureDates
 * @returns {Array}
 */
const createHighlightedDates = (availableDates: any, intermediateDates: Moment[], highlightAvailableDates: boolean, departureDates?: Moment[], isCR?: boolean): HighlightedDatesGroup[] => {
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

	if (departureDates && departureDates.length > 1 && isCR) {
		result.push({
			'react-datepicker__day--selected': departureDates
		});
	}

	return result;
};

export const getDepartureHighlightedDates = createSelector(
	[getDepartureAvailableDates, getDatesBetweenDepartureAndReturn, highlightAvailableDates, getDepartureDates, isCR],
	createHighlightedDates
);

export const getReturnHighlightedDates = createSelector(
	[getReturnAvailableDates, getDatesBetweenDepartureAndReturn, highlightAvailableDates],
	createHighlightedDates
);
