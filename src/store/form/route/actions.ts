import { AnyAction, Dispatch } from 'redux';
import {SET_ROUTE_TYPE} from '../../actions';
import {RouteType} from "../../../state";

export interface SetRouteTypeAction {
	type: string,
	payload: string;
}

export const setRouteType = (type: RouteType): SetRouteTypeAction => {

	return {
		type: SET_ROUTE_TYPE,
		payload: type
	}
};