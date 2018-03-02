import {
	ADD_SEGMENT, AIRPORT_SELECTED, AUTOCOMPLETE_LOADING_FINISHED, AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	DELETE_SEGMENT, REMOVE_COMPLEX_SEGMENTS,
	SELECT_DATE
} from '../../actions';
import { SegmentState, segmentState } from '../../../state';
import { AnyAction } from 'redux';
import { selectDateReducer } from '../dates/reducer';
import {autocompleteMainReducer} from "./autocomplete/reducer";

/*export const addAirportReducer = (state: SegmentState = segmentState, action: AnyAction): SegmentState => {
	return {
		...state,
		autocomplete: {
			...state.autocomplete,
			[action.autocompleteType]: {
				...state.autocomplete[action.autocompleteType],
				airport: action.payload.airport
			}
		}
	};
};*/

export default (state: SegmentState[] = [segmentState], action: AnyAction): SegmentState[] => {
	const segmentId = action.segmentId || 0;

	switch(action.type) {
		case AUTOCOMPLETE_LOADING_STARTED:
		case AUTOCOMPLETE_LOADING_FINISHED:
		case AUTOCOMPLETE_SUGGESTIONS_CHANGED:
		case AIRPORT_SELECTED:
			return state.map((segment: SegmentState, index: number) => {
				if (index === segmentId) {
					return {
						...segment,
						autocomplete: autocompleteMainReducer(segment.autocomplete, action)
					}
				}
				else {
					return segment;
				}
			});

		case SELECT_DATE:
			return state.map((segment: SegmentState, index: number) => {
				if (index === segmentId) {
					return {
						...segment,
						dates: {
							...segment.dates,
							[action.dateType]: selectDateReducer(segment.dates[action.dateType], action.payload.date)
						}
					};
				}
				else {
					return segment;
				}
			});

		case ADD_SEGMENT:
			return [...state, segmentState];

		case DELETE_SEGMENT:
			return [...state.splice(0, state.length - 1)];

		case REMOVE_COMPLEX_SEGMENTS:
			return [state[0]];
	}

	return state;
};
