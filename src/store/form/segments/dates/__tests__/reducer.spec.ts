import { Reducer } from 'redux-testkit'; // tslint:disable-line
import * as moment from 'moment';
import { datesMainReducer as datesReducer } from '../reducer';
import { toggleDatePicker, selectDate } from '../actions';
import { DatepickerFieldType, dateState } from '../../../../../state';

/* global describe */
/* global it */
/* global expect */
describe('store/form/segments/dates', () => {
	it('should not affect state', () => {
		Reducer(datesReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(dateState);
	});

	describe('departure', () => {
		it('should handle `TOGGLE_DATEPICKER`', () => {
			Reducer(datesReducer).expect(toggleDatePicker(false, DatepickerFieldType.Departure)).toChangeInState({ isActive: false });
			Reducer(datesReducer).expect(toggleDatePicker(true, DatepickerFieldType.Departure)).toChangeInState({ isActive: true });
		});

		it('should handle `SELECT_DATE`', () => {
			const now = moment();

			Reducer(datesReducer).expect(selectDate(now, DatepickerFieldType.Departure)).toChangeInState({ date: now });
		});
	});

	describe('return', () => {
		it('should handle `TOGGLE_DATEPICKER`', () => {
			Reducer(datesReducer).expect(toggleDatePicker(false, DatepickerFieldType.Return)).toChangeInState({ isActive: false });
			Reducer(datesReducer).expect(toggleDatePicker(true, DatepickerFieldType.Return)).toChangeInState({ isActive: true });
		});

		it('should handle `SELECT_DATE`', () => {
			const now = moment();

			Reducer(datesReducer).expect(selectDate(now)).toChangeInState({ date: now });
		});
	});
});
