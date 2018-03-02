import {
	ADD_SEGMENT, AIRPORT_SELECTED, AUTOCOMPLETE_LOADING_FINISHED, AUTOCOMPLETE_LOADING_STARTED,
	AUTOCOMPLETE_SUGGESTIONS_CHANGED,
	DELETE_SEGMENT, REMOVE_COMPLEX_SEGMENTS,
	SELECT_DATE_IN_SEGMENT,
	SET_AIRPORT_IN_SEGMENT
} from '../../actions';
import { SegmentState, segmentState } from '../../../state';
import { AnyAction } from 'redux';
import { selectDateReducer } from '../dates/reducer';
import {autocompleteMainReducer} from "../autocomplete/reducer";

export const addAirportReducer = (state: SegmentState = segmentState, action: AnyAction): SegmentState => {
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
};

export default (state: SegmentState[] = [segmentState], action: AnyAction): SegmentState[] => {
	if (action.type === SET_AIRPORT_IN_SEGMENT) {
		return state.map( (item: SegmentState, index: number) => {
			if (index === action.segmentIndex) {
				return addAirportReducer(item, action);
			}
			else {
				return item;
			}
		});
	}

	if (action.type === ADD_SEGMENT) {
		return [...state, segmentState];
	}

	if (action.type === DELETE_SEGMENT) {
		return [...state.splice(0, state.length - 1)];
	}

	if (action.type === REMOVE_COMPLEX_SEGMENTS) {
		return [state[0]];
	}

	if (
		action.type === AUTOCOMPLETE_LOADING_STARTED ||
		action.type === AUTOCOMPLETE_LOADING_FINISHED ||
		action.type === AUTOCOMPLETE_SUGGESTIONS_CHANGED ||
		action.type === AIRPORT_SELECTED
		)
	{
		console.log('here', action.type);
		let segmentId = action.segmentIndex || 0;

		return state.map( (segment: SegmentState, index: number) => {
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
	}

	if (action.type === SELECT_DATE_IN_SEGMENT) {
		return state.map( (item: SegmentState, index: number) => {
			if (index === action.segmentIndex) {
				return {
					...item,
					dates: {
						...item.dates,
						[action.dateType]: selectDateReducer(item.dates[action.dateType], action.payload.date)
					}
				};
			}
			else {
				return item;
			}
		});
	}

	return state;
};
