import { getAltLayout, encodeURLParams } from 'utils';

describe('utils', () => {
	describe('getAltLayout', () => {
		it('should return `vjcrdf` when `москва` passed', () => {
			expect(getAltLayout('москва')).toBe('vjcrdf');
		});
		
		it('should return `москва` when `vjcrdf` passed', () => {
			expect(getAltLayout('vjcrdf')).toBe('москва');
		});
	});
	
	describe('encodeURLParams', () => {
		it('should return `a=1` when `{ a: 1 }` passed', () => {
			expect(encodeURLParams({ a: 1 })).toBe('a=1');
		});
		
		it('should return `a=1&b=2` when `{ a: 1, b: 2 }` passed', () => {
			expect(encodeURLParams({ a: 1, b: 2 })).toBe('a=1&b=2');
		});
		
		it('should return `` when `{}` or anything but object passed', () => {
			expect(encodeURLParams({})).toBe('');
			expect(encodeURLParams()).toBe('');
			expect(encodeURLParams('asf')).toBe('');
		});
	});
});