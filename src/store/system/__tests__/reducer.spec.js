import UUT from '../reducer';
import { systemState } from 'state';

describe('store/system/reducer', () => {
	it('should have initial state', () => {
		expect(UUT()).toEqual(systemState);
	});
});