import { getStore } from '../store';
import { initialState, systemState } from 'state';
import moment from 'moment';

/* global describe */
/* global it */
/* global expect */
describe('preinit options', () => {
	it('should have system state when config is empty', () => {
		const config = {};

		expect(getStore(config).getState().system).toEqual(systemState);
	});

	it('should have passengers set from config', () => {
		const config = { defaultPassengers: { ADT: 2, CLD: 1 } };
		let expectValue = initialState.form.passengers;

		for (let type in config.defaultPassengers) {
			if (config.defaultPassengers.hasOwnProperty(type)) {
				expectValue[type].count = config.defaultPassengers[type];
			}
		}

		expect(getStore(config).getState().form.passengers).toEqual(expectValue);
	});

	it('should be merge with config additional options and initial. Change Class Type', () => {
		const config = { defaultServiceClass: 'Business' };
		let expectValue = systemState;
		expectValue.defaultServiceClass = 'Business';

		expect(getStore(config).getState().system).toEqual(expectValue);
	});

	it('should be merge with config additional options and initial. Change Vicinity Mode', () => {
		const config = { vicinityDatesMode: true };
		let expectValue = systemState;
		expectValue.vicinityDatesMode = true;

		expect(getStore(config).getState().system).toEqual(expectValue);
	});

	it('should be merge with config additional options and initial. Change Direct Only', () => {
		const config = { directOnly: true };
		let expectValue = systemState;
		expectValue.directOnly = true;

		expect(getStore(config).getState().system).toEqual(expectValue);
	});

	it('should be date from config', () => {
		const config = { defaultDepartureDate: '2018-01-01', defaultReturnDate: '2018-01-09' };
		let expectValue = initialState.form;
		expectValue.dates.departure.date = moment(config.defaultDepartureDate);
		expectValue.dates.return.date = moment(config.defaultReturnDate);

		expect(getStore(config).getState().form.dates).toEqual(expectValue.dates);
	});

});