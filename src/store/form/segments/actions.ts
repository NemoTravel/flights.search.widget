import { Action, AnyAction, Dispatch } from 'redux';
import { AutocompleteFieldType, CommonThunkAction, DatepickerFieldType, GetStateFunction } from '../../../state';
import {
	ADD_SEGMENT, DELETE_SEGMENT, AIRPORT_SELECTED, SELECT_DATE,
	REMOVE_COMPLEX_SEGMENTS
} from '../../actions';
import { pushAiprortInCache, getDatesAvailability } from '../autocomplete/actions';
import { Moment } from 'moment';

export interface SegmentAction extends Action {
	segmentId: number;
	type: string;
}

export interface AutocompleteActionExtend {
	type: string;
	autocompleteType: AutocompleteFieldType;
	segmentId: number;
	payload?: any;
}

export interface DatepickerActionExtend {
	type: string;
	dateType: DatepickerFieldType;
	segmentId: number;
	payload?: any;
}

export const setAirportInSegment = (airport: any, autocompleteType: AutocompleteFieldType, segmentId: number = 0): AutocompleteActionExtend => {
	return {
		type: AIRPORT_SELECTED,
		autocompleteType,
		segmentId: segmentId,
		payload: {
			airport
		}
	};
};

export const removeComplexSegments = (): SegmentAction => {
	return {
		type: REMOVE_COMPLEX_SEGMENTS,
		segmentId: 0
	};
};

export const selectDateInSegment = (date: Moment, dateType: DatepickerFieldType, segmentId: number = 0): DatepickerActionExtend => {
	return {
		type: SELECT_DATE,
		dateType,
		segmentId: segmentId,
		payload: {
			date
		}
	};
};

export const addSegment = (): SegmentAction => {
	return {
		type: ADD_SEGMENT,
		segmentId: 1
	};
};

export const deleteSegment = (): SegmentAction => {
	return {
		type: DELETE_SEGMENT,
		segmentId: 1
	};
};

export const selectAirportInSegment = (airport: any, autocompleteType: AutocompleteFieldType, segmentId: number): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		dispatch(setAirportInSegment(airport, autocompleteType, segmentId));
		getDatesAvailability(dispatch, getState);
		pushAiprortInCache(dispatch, getState, airport);
	};
};

export const continueRoute = (): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const segments = getState().form.segments;
		const arrAirportInLastSegment = segments.length > 0 ? segments[segments.length - 1].autocomplete.arrival.airport : null;

		dispatch(addSegment());

		if (arrAirportInLastSegment) {
			dispatch(setAirportInSegment(arrAirportInLastSegment, AutocompleteFieldType.Departure, segments.length));
		}
	}
};
