import { Reducer } from 'redux-testkit';
import { showErrors } from '../actions';
import { showErrorsReducer } from '../reducer';

/* global describe */
/* global it */
/* global expect */
describe('store/form/reducer', () => {
	it('should have initial state', () => {
		expect(showErrorsReducer()).toEqual(false);
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
