import {
	ADD_SEGMENT, AIRPORT_SELECTED, AUTOCOMPLETE_LOADING_FINISHED, AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_PUSH_TO_PREVIOUS,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	DELETE_SEGMENT, REMOVE_COMPLEX_SEGMENTS,
	SELECT_DATE, SET_AVAILABLE_DATES, TOGGLE_DATEPICKER
} from '../../actions';
import { SegmentState, segmentState } from '../../../state';
import { datesMainReducer } from './dates/reducer';
import { autocompleteMainReducer } from "./autocomplete/reducer";

export default (state: SegmentState[] = [segmentState], action: any): SegmentState[] => {
	const segmentId = action.segmentId || 0;

	switch(action.type) {
		case AUTOCOMPLETE_LOADING_STARTED:
		case AUTOCOMPLETE_LOADING_FINISHED:
		case AUTOCOMPLETE_SUGGESTIONS_CHANGED:
		case AIRPORT_SELECTED:
		case AUTOCOMPLETE_PUSH_TO_PREVIOUS:
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

		case TOGGLE_DATEPICKER:
		case SELECT_DATE:
		case SET_AVAILABLE_DATES:
			return state.map((segment: SegmentState, index: number) => {
				if (index === segmentId) {
					return {
						...segment,
						dates: datesMainReducer(segment.dates, action)
					}
				}
				else {
					return segment;
				}
			});

		/*case SELECT_DATE:
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
			});*/

		case ADD_SEGMENT:
			return [...state, segmentState];

		case DELETE_SEGMENT:
			return [...state.splice(0, state.length - 1)];

		case REMOVE_COMPLEX_SEGMENTS:
			return [state[0]];
	}

	return state;
};
