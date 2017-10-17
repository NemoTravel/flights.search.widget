import { Reducer } from 'redux-testkit';
import { showErrors } from '../actions';
import { showErrorsReducer } from '../reducer';

describe('store/form/reducer', () => {
	it('should have initial state', () => {
		expect(showErrorsReducer()).toEqual(false);
	});

	it('should not affect state', () => {
		Reducer(showErrorsReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(false);
	});

	it('should store new config', () => {
		Reducer(showErrorsReducer).expect(showErrors(true)).toReturnState(true);
		Reducer(showErrorsReducer).expect(showErrors(false)).toReturnState(false);
	});
});