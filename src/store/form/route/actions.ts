import { AnyAction, Dispatch } from 'redux';
import { SET_ROUTE_TYPE } from '../../actions';
import {
	AutocompleteFieldType, CommonThunkAction, GetStateFunction, RouteType,
	SEGMENTS_COUNT_RT
} from '../../../state';
import { addSegment } from '../segments/actions';
import { setSelectedAirport } from '../segments/autocomplete/actions';
import { Airport } from '../../../services/models/Airport';

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

const airportsAreEqual = (airport1: Airport, airport2: Airport): boolean => {
	return ((airport1 && airport2) && airport1.IATA === airport2.IATA);
};

const setSimpleRoute = (getState: GetStateFunction, dispatch: Dispatch<AnyAction>): void => {
	const segments = getState().form.segments;

	if (
		segments.length >= SEGMENTS_COUNT_RT &&
		airportsAreEqual(segments[0].autocomplete.arrival.airport, segments[1].autocomplete.departure.airport) &&
		airportsAreEqual(segments[0].autocomplete.departure.airport, segments[1].autocomplete.arrival.airport) &&
		segments[1].departureDate.date
	) {
		dispatch(setRouteTypeAction(RouteType.RT));
	}
	else {
		dispatch(setRouteTypeAction(RouteType.OW));
	}
};

export const setRouteType = (newRouteType: RouteType): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const currentRouteType = getState().form.routeType,
					  segments = getState().form.segments;

		if (newRouteType === RouteType.OW) {
			if (currentRouteType === RouteType.RT) {
				dispatch(setRouteTypeAction(RouteType.OW));
			}
			else if (currentRouteType === RouteType.CR) {
				setSimpleRoute(getState, dispatch);
			}
		}

		else if (newRouteType === RouteType.RT) {
			if (segments.length < SEGMENTS_COUNT_RT) {
				dispatch(addSegment());
			}

			dispatch(setRouteTypeAction(RouteType.RT));
		}

		else if (newRouteType === RouteType.CR) {
			if (segments.length < 2) {
				dispatch(addSegment());
				dispatch(setSelectedAirport(segments[0].autocomplete.arrival.airport, AutocompleteFieldType.Departure, 1));
			}

			if (currentRouteType === RouteType.RT) {
				dispatch(setSelectedAirport(segments[0].autocomplete.arrival.airport, AutocompleteFieldType.Departure, 1));
				dispatch(setSelectedAirport(segments[0].autocomplete.departure.airport, AutocompleteFieldType.Arrival, 1));
			}

			dispatch(setRouteTypeAction(RouteType.CR));
		}
	};
};
