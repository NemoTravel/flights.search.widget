import {RouteType} from "../../../state";
import {SetRouteTypeAction} from "./actions";
import {SET_ROUTE_TYPE} from "../../actions";

export default (state: RouteType = RouteType.OW, { type, payload }: SetRouteTypeAction): RouteType => {

	console.log(type, payload);
	if (type === SET_ROUTE_TYPE) {
		switch (payload) {
			case 'OW': return RouteType.OW;
			case 'RT': return RouteType.RT;
			case 'CR': return RouteType.CR;
		}
	}

	return state;
};