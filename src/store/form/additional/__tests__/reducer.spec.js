import additionalReducer from '../reducer';
import { setClassType, vicinityDatesAction, directFlightAction } from '../actions';
import { additionalState } from 'state';
import { Reducer } from 'redux-testkit';

describe('store/additional/reducer', () => {
	it("should have initial state", () => {
		expect(additionalReducer()).toEqual(additionalState);
	});

	it("should not affect state", () => {
		Reducer(additionalReducer).expect({type: 'WRONG_TYPE'}).toReturnState(additionalState);
	});

	it("should handle `SET_CLASS_TYPE`", () => {
		Reducer(additionalReducer).expect(setClassType('Some class name')).toChangeInState({classType: 'Some class name'});
	});

	it("should handle `SET_CLASS_TYPE` on existing state", () => {
		const state = {vicinityDates: true, directFlight: false, classType: "First"};

		Reducer(additionalReducer).withState(state).expect(setClassType('Some class name')).toChangeInState({classType: 'Some class name'});
	});

	it("should handle `TOGGLE_VICINITY_DATES` on existing state", () => {
		const state = {vicinityDates: true, directFlight: false, classType: "First"};

		Reducer(additionalReducer).withState(state).expect(vicinityDatesAction()).toChangeInState({vicinityDates: false});
	});

	it("should handle `TOGGLE_VICINITY_DATES` on initial state", () => {
		Reducer(additionalReducer).expect(vicinityDatesAction()).toChangeInState({vicinityDates: !additionalState.vicinityDates});
	});

	it("should handle `TOGGLE_DIRECT_FLIGHT` on existing state", () => {
		const state = {vicinityDates: false, directFlight: true, classType: "First"};

		Reducer(additionalReducer).withState(state).expect(directFlightAction()).toChangeInState({directFlight: false});
	});

	it("should handle `TOGGLE_DIRECT_FLIGHT` on initial state", () => {
		Reducer(additionalReducer).expect(directFlightAction()).toChangeInState({directFlight: !additionalState.directFlight});
	});
});