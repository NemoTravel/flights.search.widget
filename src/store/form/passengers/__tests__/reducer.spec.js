import passengersReducer from '../reducer';
import { ADD_PASSENGER } from '../../../actions';
import { addPassenger, removePassenger, setCounter } from '../actions';
import { passengersState } from 'state';
import { Reducer } from 'redux-testkit';

describe('store/passengers/reducer', () => {
	it('should have initial state', () => {
		expect(passengersReducer()).toEqual(passengersState);
	});

	it('should not affect state', () => {
		Reducer(passengersReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(passengersState);
	});

	it('should not affect state if no `passengerType` provided', () => {
		Reducer(passengersReducer).expect({ type: ADD_PASSENGER }).toReturnState(passengersState);
	});
	
	describe('ADT', () => {
		it('should handle `ADD_PASSENGER`', () => {
			Reducer(passengersReducer).expect(addPassenger('ADT')).toChangeInState({ ADT: { count: 2 } });
		});

		it('should handle `REMOVE_PASSENGER`', () => {
			Reducer(passengersReducer).expect(removePassenger('ADT')).toChangeInState({ ADT: { count: 0 } });
		});

		it('should handle `SET_PASSENGER_COUNTER`', () => {
			Reducer(passengersReducer).expect(setCounter(5, 'ADT')).toChangeInState({ ADT: { count: 5 } });
		});
	});
	
	describe('CLD', () => {
		it('should handle `ADD_PASSENGER`', () => {
			Reducer(passengersReducer).expect(addPassenger('CLD')).toChangeInState({ CLD: { count: 1 } });
		});

		it('should handle `REMOVE_PASSENGER`', () => {
			Reducer(passengersReducer).expect(removePassenger('CLD')).toChangeInState({ CLD: { count: -1 } });
		});

		it('should handle `SET_PASSENGER_COUNTER`', () => {
			Reducer(passengersReducer).expect(setCounter(5, 'CLD')).toChangeInState({ CLD: { count: 5 } });
		});
	});
	
	describe('INF', () => {
		it('should handle `ADD_PASSENGER`', () => {
			Reducer(passengersReducer).expect(addPassenger('INF')).toChangeInState({ INF: { count: 1 } });
		});

		it('should handle `REMOVE_PASSENGER`', () => {
			Reducer(passengersReducer).expect(removePassenger('INF')).toChangeInState({ INF: { count: -1 } });
		});

		it('should handle `SET_PASSENGER_COUNTER`', () => {
			Reducer(passengersReducer).expect(setCounter(5, 'INF')).toChangeInState({ INF: { count: 5 } });
		});
	});
	
	describe('INS', () => {
		it('should handle `ADD_PASSENGER`', () => {
			Reducer(passengersReducer).expect(addPassenger('INS')).toChangeInState({ INS: { count: 1 } });
		});

		it('should handle `REMOVE_PASSENGER`', () => {
			Reducer(passengersReducer).expect(removePassenger('INS')).toChangeInState({ INS: { count: -1 } });
		});

		it('should handle `SET_PASSENGER_COUNTER`', () => {
			Reducer(passengersReducer).expect(setCounter(5, 'INS')).toChangeInState({ INS: { count: 5 } });
		});
	});
});