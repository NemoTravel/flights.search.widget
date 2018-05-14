import * as moment from 'moment';
import { getStore } from '../store';
import { initialState, segmentState, ServiceClass, systemState } from '../state';

/* global describe */
/* global it */
/* global expect */
describe('preinit options', () => {
	it('should have system state when config is empty', () => {
		const config = {};

		expect(getStore(config).getState().system).toEqual(systemState);
	});

	it('should have passengers set from config', () => {
		const config: { defaultPassengers: { [passengerType: string]: number } } = { defaultPassengers: { ADT: 2, CLD: 1 } };
		const expectValue = initialState.form.passengers;

		for (const type in config.defaultPassengers) {
			if (config.defaultPassengers.hasOwnProperty(type)) {
				expectValue[type].count = config.defaultPassengers[type];
			}
		}

		expect(getStore(config).getState().form.passengers).toEqual(expectValue);
	});

	it('should be merge with config additional options and initial. Change Class Type', () => {
		const config = { defaultServiceClass: ServiceClass.Business };
		const expectValue = systemState;

		expectValue.defaultServiceClass = ServiceClass.Business;

		expect(getStore(config).getState().system).toEqual(expectValue);
	});

	it('should be merge with config additional options and initial. Change Vicinity Mode', () => {
		const config = { vicinityDatesMode: true };
		const expectValue = systemState;

		expectValue.vicinityDatesMode = true;

		expect(getStore(config).getState().system).toEqual(expectValue);
	});

	it('should be merge with config additional options and initial. Change Direct Only', () => {
		const config = { directOnly: true };
		const expectValue = systemState;

		expectValue.directOnly = true;

		expect(getStore(config).getState().system).toEqual(expectValue);
	});

	it('should be date from config', () => {
		const config = { defaultDepartureDate: '2018-01-01', defaultReturnDate: '2018-01-09' };
		const expectValue = initialState.form;

		expectValue.segments.push(segmentState);
		expectValue.segments.push(segmentState);

		expectValue.segments[0].departureDate.date = moment(config.defaultDepartureDate);
		expectValue.segments[1].departureDate.date = moment(config.defaultReturnDate);

		expect(getStore(config).getState().form.segments).toEqual(expectValue.segments);
	});

});
