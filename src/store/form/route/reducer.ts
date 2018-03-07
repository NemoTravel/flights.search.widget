import { RouteType } from '../../../state';
import { SetRouteTypeAction } from './actions';
import { SET_ROUTE_TYPE } from '../../actions';

export default (state: RouteType = RouteType.OW, { type, payload }: SetRouteTypeAction): RouteType => {
	if (type === SET_ROUTE_TYPE) {
		return payload;
	}

	return state;
};
