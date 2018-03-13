import { Reducer } from 'redux-testkit'; // tslint:disable-line
import additionalReducer from '../reducer';
import { setClassType, vicinityDatesAction, directFlightAction } from '../actions';
import { additionalState, ServiceClass } from '../../../../state';

/* global describe */
/* global it */
/* global expect */
describe('store/additional/reducer', () => {
	it('should have initial state', () => {
		expect(additionalReducer(undefined, { type: 'TEST' })).toEqual(additionalState);
	});

	it('should not affect state', () => {
		Reducer(additionalReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(additionalState);
	});

	it('should handle `SET_CLASS_TYPE`', () => {
		Reducer(additionalReducer).expect(setClassType(ServiceClass.Business)).toChangeInState({ classType: ServiceClass.Business });
	});

	it('should handle `SET_CLASS_TYPE` on existing state', () => {
		const state = { vicinityDates: true, directFlight: false, classType: ServiceClass.Economy };

		Reducer(additionalReducer).withState(state).expect(setClassType(ServiceClass.Business)).toChangeInState({ classType: ServiceClass.Business });
	});

	it('should handle `TOGGLE_VICINITY_DATES` on existing state', () => {
		const state = { vicinityDates: true, directFlight: false, classType: ServiceClass.Economy };

		Reducer(additionalReducer).withState(state).expect(vicinityDatesAction()).toChangeInState({ vicinityDates: false });
	});

	it('should handle `TOGGLE_VICINITY_DATES` on initial state', () => {
		Reducer(additionalReducer).expect(vicinityDatesAction()).toChangeInState({ vicinityDates: !additionalState.vicinityDates });
	});

	it('should handle `TOGGLE_DIRECT_FLIGHT` on existing state', () => {
		const state = { vicinityDates: false, directFlight: true, classType: ServiceClass.Economy };

		Reducer(additionalReducer).withState(state).expect(directFlightAction()).toChangeInState({ directFlight: false });
	});

	it('should handle `TOGGLE_DIRECT_FLIGHT` on initial state', () => {
		Reducer(additionalReducer).expect(directFlightAction()).toChangeInState({ directFlight: !additionalState.directFlight });
	});
});
