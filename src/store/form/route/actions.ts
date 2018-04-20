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

export const setRouteType = (newRouteType: RouteType): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const currentRouteType = getState().form.routeType,
					  segments = getState().form.segments;

		// back from complex route mode
		if (currentRouteType === RouteType.CR && newRouteType === RouteType.OW) {
			if (
				segments.length > 1 &&
				segments[0].autocomplete.arrival.airport &&
				segments[1].autocomplete.departure.airport &&
				segments[0].autocomplete.arrival.airport.IATA === segments[1].autocomplete.departure.airport.IATA &&
				segments[0].autocomplete.departure.airport.IATA === segments[1].autocomplete.arrival.airport.IATA
			) {
				dispatch(setRouteTypeAction(RouteType.RT));
				return;
			}
		}
		else if (newRouteType === RouteType.RT && segments.length < 2) {
			dispatch(addSegment());
		}
		else if (currentRouteType === RouteType.RT && newRouteType === RouteType.CR) {
			dispatch(setSelectedAirport(segments[0].autocomplete.arrival.airport, AutocompleteFieldType.Departure, 1));
			dispatch(setSelectedAirport(segments[0].autocomplete.departure.airport, AutocompleteFieldType.Arrival, 1));
		}

		dispatch(setRouteTypeAction(newRouteType));
	};
};
