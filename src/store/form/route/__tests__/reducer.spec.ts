import { Reducer } from 'redux-testkit'; // tslint:disable-line
import routeReducer from '../reducer';
import { setRouteTypeAction } from '../actions';
import { RouteType } from '../../../../state';

/* global describe */
/* global it */
describe('store/form/route/reducer', () => {
	it('should have initial state', () => {
		Reducer(routeReducer).expect({type: 'WRONG_TYPE'}).toReturnState(RouteType.OW);
	});

	it('should change route type', () => {
		Reducer(routeReducer).expect(setRouteTypeAction(RouteType.RT)).toReturnState(RouteType.RT);
		Reducer(routeReducer).expect(setRouteTypeAction(RouteType.CR)).toReturnState(RouteType.CR);

		Reducer(routeReducer).withState(RouteType.CR).expect(setRouteTypeAction(RouteType.OW)).toReturnState(RouteType.OW);
	});
});
