import { Reducer } from 'redux-testkit'; // tslint:disable-line
import * as moment from 'moment';
import { datesMainReducer as datesReducer } from '../reducer';
import { TOGGLE_DATEPICKER } from '../../../../actions';
import { toggleDatePicker, selectDate } from '../actions';
import { DatepickerFieldType, datesState } from '../../../../../state';

/* global describe */
/* global it */
/* global expect */
describe('store/form/segments/dates', () => {
	it('should not affect state', () => {
		Reducer(datesReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(datesState);
	});

	it('should not affect state if no `dateType` provided', () => {
		Reducer(datesReducer).expect({ type: TOGGLE_DATEPICKER }).toReturnState(datesState);
	});

	describe('departure', () => {
		it('should handle `TOGGLE_DATEPICKER`', () => {
			Reducer(datesReducer).expect(toggleDatePicker(false, DatepickerFieldType.Departure)).toChangeInState({ departure: { isActive: false } });
			Reducer(datesReducer).expect(toggleDatePicker(true, DatepickerFieldType.Departure)).toChangeInState({ departure: { isActive: true } });
		});

		it('should handle `SELECT_DATE`', () => {
			const now = moment();

			Reducer(datesReducer).expect(selectDate(now, DatepickerFieldType.Departure)).toChangeInState({ departure: { date: now } });
		});
	});

	describe('return', () => {
		it('should handle `TOGGLE_DATEPICKER`', () => {
			Reducer(datesReducer).expect(toggleDatePicker(false, DatepickerFieldType.Return)).toChangeInState({ return: { isActive: false } });
			Reducer(datesReducer).expect(toggleDatePicker(true, DatepickerFieldType.Return)).toChangeInState({ return: { isActive: true } });
		});

		it('should handle `SELECT_DATE`', () => {
			const now = moment();

			Reducer(datesReducer).expect(selectDate(now, DatepickerFieldType.Return)).toChangeInState({ return: { date: now } });
		});
	});
});
