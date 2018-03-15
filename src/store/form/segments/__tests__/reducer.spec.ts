import { Reducer } from 'redux-testkit'; // tslint:disable-line
import segmentReducer from '../reducer';
import { addSegment, deleteSegment, removeComplexSegments } from '../actions';
import { segmentState } from '../../../../state';

/* global describe */
/* global it */
/* global expect */
describe('store/form/segments', () => {
	it('should not affect state', () => {
		Reducer(segmentReducer).expect({ type: 'WRONG_TYPE' }).toReturnState([segmentState]);
	});

	describe('segments actions', () => {
		it('should handle `ADD_SEGMENT`', () => {
			Reducer(segmentReducer).expect(addSegment()).toReturnState([segmentState, segmentState]);
		});

		it('should handle `REMOVE_SEGMENT`', () => {
			Reducer(segmentReducer).expect(deleteSegment()).toReturnState([]);
		});

		it('should handle `REMOVE_COMPLEX_SEGMENTS`', () => {
			const state = [segmentState, segmentState, segmentState];

			Reducer(segmentReducer).withState(state).expect(removeComplexSegments()).toReturnState([segmentState]);
		});
	})
});
