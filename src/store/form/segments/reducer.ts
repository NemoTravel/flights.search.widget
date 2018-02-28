import {ADD_SEGMENT, DELETE_SEGMENT, SELECT_DATE_IN_SEGMENT, SET_AIRPORT_IN_SEGMENT} from '../../actions';
import { SegmentState, segmentState } from '../../../state';
import { SegmentAction } from './actions';
import {AnyAction} from "redux";
import {autocompleteAirportReducer} from "../autocomplete/reducer";
import {selectDateReducer} from "../dates/reducer";

export const addAirportReducer = (state: SegmentState = segmentState, action: AnyAction): SegmentState => {
	return {
		...state,
		'autocomplete': {
			...state.autocomplete,
			[action.autocompleteType]: {
				...state.autocomplete[action.autocompleteType],
				airport: action.payload.airport
			}
		}
	}
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

	if (action.type === SELECT_DATE_IN_SEGMENT) {
		return state.map( (item: SegmentState, index: number) => {
			if (index === action.segmentIndex) {
				return {
					...item,
					date: selectDateReducer(item.date, action.payload.date)
				}
			}
			else {
				return item;
			}
		});
	}

	return state;
};
