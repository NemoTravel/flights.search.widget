import { Reducer } from 'redux-testkit'; // tslint:disable-line
import systemReducer from '../reducer';
import { LOAD_CONFIG } from '../../actions';
import { systemState } from '../../../state';

/* global describe */
/* global it */
/* global expect */
describe('store/system/reducer', () => {
	it('should have initial state', () => {
		expect(systemReducer(undefined, { type: 'WRONG_TYPE', payload: null })).toEqual(systemState);
	});

	it('should not affect state', () => {
		Reducer(systemReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(systemState);
	});

	it('should store new config', () => {
		const newConfig = { locale: 'zh' };
		const action = {
			type: LOAD_CONFIG,
			payload: newConfig
		};

		Reducer(systemReducer).expect(action).toChangeInState(newConfig);
	});
});
