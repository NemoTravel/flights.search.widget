import { Reducer } from 'redux-testkit'; // tslint:disable-line
import passengersReducer from '../reducer';
import { ADD_PASSENGER } from '../../../actions';
import { addPassenger, removePassenger, setCounter } from '../actions';
import { passengersState, PassengerType } from '../../../../state';

/* global describe */
/* global it */
/* global expect */
describe('store/passengers/reducer', () => {
	it('should not affect state', () => {
		Reducer(passengersReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(passengersState);
	});

	it('should not affect state if no `passengerType` provided', () => {
		Reducer(passengersReducer).expect({ type: ADD_PASSENGER }).toReturnState(passengersState);
	});

	describe('ADT', () => {
		it('should handle `ADD_PASSENGER`', () => {
			Reducer(passengersReducer).expect(addPassenger(PassengerType.Adult)).toChangeInState({ ADT: { count: 1 } });
		});

		it('should handle `REMOVE_PASSENGER`', () => {
			Reducer(passengersReducer).expect(removePassenger(PassengerType.Adult)).toChangeInState({ ADT: { count: -1 } });
		});

		it('should handle `SET_PASSENGER_COUNTER`', () => {
			Reducer(passengersReducer).expect(setCounter(0, PassengerType.Adult)).toChangeInState({ ADT: { count: 0 } });
		});
	});

	describe('CLD', () => {
		it('should handle `ADD_PASSENGER`', () => {
			Reducer(passengersReducer).expect(addPassenger(PassengerType.Child)).toChangeInState({ CLD: { count: 1 } });
		});

		it('should handle `REMOVE_PASSENGER`', () => {
			Reducer(passengersReducer).expect(removePassenger(PassengerType.Child)).toChangeInState({ CLD: { count: -1 } });
		});

		it('should handle `SET_PASSENGER_COUNTER`', () => {
			Reducer(passengersReducer).expect(setCounter(0, PassengerType.Child)).toChangeInState({ CLD: { count: 0 } });
		});
	});

	describe('INF', () => {
		it('should handle `ADD_PASSENGER`', () => {
			Reducer(passengersReducer).expect(addPassenger(PassengerType.Infant)).toChangeInState({ INF: { count: 1 } });
		});

		it('should handle `REMOVE_PASSENGER`', () => {
			Reducer(passengersReducer).expect(removePassenger(PassengerType.Infant)).toChangeInState({ INF: { count: -1 } });
		});

		it('should handle `SET_PASSENGER_COUNTER`', () => {
			Reducer(passengersReducer).expect(setCounter(0, PassengerType.Infant)).toChangeInState({ INF: { count: 0 } });
		});
	});

	describe('INS', () => {
		it('should handle `ADD_PASSENGER`', () => {
			Reducer(passengersReducer).expect(addPassenger(PassengerType.InfantWithSeat)).toChangeInState({ INS: { count: 1 } });
		});

		it('should handle `REMOVE_PASSENGER`', () => {
			Reducer(passengersReducer).expect(removePassenger(PassengerType.InfantWithSeat)).toChangeInState({ INS: { count: -1 } });
		});

		it('should handle `SET_PASSENGER_COUNTER`', () => {
			Reducer(passengersReducer).expect(setCounter(0, PassengerType.InfantWithSeat)).toChangeInState({ INS: { count: 0 } });
		});
	});
});
