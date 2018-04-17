import { AnyAction, Dispatch } from 'redux';
import { SET_ROUTE_TYPE } from '../../actions';
import { AutocompleteFieldType, CommonThunkAction, GetStateFunction, RouteType } from '../../../state';
import { addSegment, removeComplexSegments } from '../segments/actions';
import { setSelectedAirport } from "../segments/autocomplete/actions";

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
		let segments = getState().form.segments;

		if (type === RouteType.OW && getState().form.routeType === RouteType.CR) {
			if (segments.length > 1) {
				if (
					segments[0].autocomplete.arrival.airport.IATA === segments[1].autocomplete.departure.airport.IATA &&
					segments[0].autocomplete.departure.airport.IATA === segments[1].autocomplete.arrival.airport.IATA
				) {
					dispatch(setRouteTypeAction(RouteType.RT));
					return;
				}
			}
		}
		else if (type === RouteType.RT && getState().form.segments.length < 2) {
			dispatch(addSegment());
		}

		if (type === RouteType.CR) {
			if (getState().form.routeType === RouteType.RT) {
				let segments = getState().form.segments;

				dispatch(setSelectedAirport(segments[0].autocomplete.arrival.airport, AutocompleteFieldType.Departure, 1));
				dispatch(setSelectedAirport(segments[0].autocomplete.departure.airport, AutocompleteFieldType.Arrival, 1));
			}
		}

		dispatch(setRouteTypeAction(type));
	};
};
