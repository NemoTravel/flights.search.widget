import { AnyAction, Dispatch } from 'redux';
import { SET_ROUTE_TYPE } from '../../actions';
import { CommonThunkAction, GetStateFunction, RouteType } from '../../../state';
import { removeComplexSegments } from '../segments/actions';

export interface SetRouteTypeAction {
	type: string,
	payload: RouteType;
}

export const setRouteTypeAction = (type: RouteType): SetRouteTypeAction => {
	return {
		type: SET_ROUTE_TYPE,
		payload: type
	};
};

export const setRouteType = (type: RouteType): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		dispatch(setRouteTypeAction(type));
		dispatch(removeComplexSegments());
	};
};
