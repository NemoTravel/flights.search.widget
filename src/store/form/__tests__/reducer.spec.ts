import { Reducer } from 'redux-testkit'; // tslint:disable-line
import { showErrors } from '../actions';
import { showErrorsReducer } from '../reducer';

/* global describe */
/* global it */
/* global expect */
describe('store/form/reducer', () => {
	it('should have initial state', () => {
		expect(showErrorsReducer(undefined, { type: 'WRONG_TYPE', payload: null })).toEqual(false);
	});

	it('should not affect state', () => {
		Reducer(showErrorsReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(false);
	});

	it('should hide errors', () => {
		Reducer(showErrorsReducer).expect(showErrors(false)).toReturnState(false);
	});

	it('should show errors', () => {
		Reducer(showErrorsReducer).expect(showErrors(true)).toReturnState(true);
	});
});
