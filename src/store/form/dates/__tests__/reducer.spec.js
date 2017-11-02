import datesReducer from '../reducer';
import { datesState } from 'state';
import { TOGGLE_DATEPICKER } from '../../../actions';
import { Reducer } from 'redux-testkit';
import { toggleDatePicker, selectDate } from '../actions';
import moment from 'moment';

/* global describe */
/* global it */
/* global expect */
describe('store/form/dates', () => {
	it('should have initial state', () => {
		expect(datesReducer()).toEqual(datesState);
	});

	it('should not affect state', () => {
		Reducer(datesReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(datesState);
	});

	it('should not affect state if no `dateType` provided', () => {
		Reducer(datesReducer).expect({ type: TOGGLE_DATEPICKER }).toReturnState(datesState);
	});

	describe('departure', () => {
		it('should handle `TOGGLE_DATEPICKER`', () => {
			Reducer(datesReducer).expect(toggleDatePicker(false, 'departure')).toChangeInState({ departure: { isActive: false } });
			Reducer(datesReducer).expect(toggleDatePicker(true, 'departure')).toChangeInState({ departure: { isActive: true } });
		});

		it('should handle `SELECT_DATE`', () => {
			const now = moment();

			Reducer(datesReducer).expect(selectDate(now, 'departure')).toChangeInState({ departure: { date: now } });
		});
	});

	describe('return', () => {
		it('should handle `TOGGLE_DATEPICKER`', () => {
			Reducer(datesReducer).expect(toggleDatePicker(false, 'return')).toChangeInState({ return: { isActive: false } });
			Reducer(datesReducer).expect(toggleDatePicker(true, 'return')).toChangeInState({ return: { isActive: true } });
		});

		it('should handle `SELECT_DATE`', () => {
			const now = moment();

			Reducer(datesReducer).expect(selectDate(now, 'return')).toChangeInState({ return: { date: now } });
		});
	});
});
