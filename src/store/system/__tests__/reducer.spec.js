import systemReducer from '../reducer';
import { LOAD_CONFIG } from 'store/actions';
import { systemState } from 'state';
import { Reducer } from 'redux-testkit';

describe('store/system/reducer', () => {
	it('should have initial state', () => {
		expect(systemReducer()).toEqual(systemState);
	});
	
	it('should not affect state', () => {
		Reducer(systemReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(systemState);
	});
	
	it('should store new config', () => {
		const newConfig = {
			locale: 'zh',
			verticalForm: false
		};
		
		const action = {
			type: LOAD_CONFIG,
			payload: newConfig
		};
		
		Reducer(systemReducer).expect(action).toReturnState({ ...systemState, ...newConfig });
	});
});