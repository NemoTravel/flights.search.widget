import {Action, AnyAction, Dispatch} from 'redux';
import {AutocompleteFieldType, CommonThunkAction, GetStateFunction} from "../../../state";
import {AutocompleteAction} from "../autocomplete/actions";
import {ADD_SEGMENT, DELETE_SEGMENT, SET_AIRPORT_IN_SEGMENT} from "../../actions";

export interface SegmentAction extends Action {
	segmentId: number;
	type: string;
}

export interface AutocompleteActionExtend {
	type: string;
	autocompleteType: AutocompleteFieldType;
	segmentIndex: number;
	payload?: any;
}

export const setAirportInSegment = (airport: any, autocompleteType: AutocompleteFieldType, segmentId: number = 0): AutocompleteActionExtend => {
	return {
		type: SET_AIRPORT_IN_SEGMENT,
		autocompleteType,
		segmentIndex: segmentId,
		payload: {
			airport
		}
	}
};

export const addSegment = (): SegmentAction => {
	return {
		type: ADD_SEGMENT,
		segmentId: 1
	}
};

export const deleteSegment = (): SegmentAction => {
	return {
		type: DELETE_SEGMENT,
		segmentId: 1
	}
};

export const selectAirportInSegment = (airport: any, autocompleteType: AutocompleteFieldType, segmentId: number): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		dispatch(setAirportInSegment(airport, autocompleteType, segmentId));
		//getDatesAvailability(dispatch, getState);
		//pushAiprortInCache(dispatch, getState, airport);
	};
};

