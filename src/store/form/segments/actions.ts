import {Action, AnyAction, Dispatch} from 'redux';
import {AutocompleteFieldType, CommonThunkAction, GetStateFunction} from "../../../state";
import {AutocompleteAction} from "../autocomplete/actions";
import {SET_AIRPORT_IN_SEGMENT} from "../../actions";

export interface SegmentAction extends Action {
	segmentId: number;
	type: string;
}

export const setAirportInSegment = (airport: any, autocompleteType: AutocompleteFieldType): AutocompleteAction => {
	return {
		type: SET_AIRPORT_IN_SEGMENT,
		autocompleteType,
		payload: {
			airport
		}
	}
};

export const selectAirportInSegment = (airport: any, autocompleteType: AutocompleteFieldType): CommonThunkAction => {
	//console.log('hello from segment');
	//return null;
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		dispatch(setAirportInSegment(airport, autocompleteType));
		//getDatesAvailability(dispatch, getState);
		//pushAiprortInCache(dispatch, getState, airport);
	};
};

