import * as moment from 'moment';
import { createStore } from 'redux';

import { getDepartureOptions, getArrivalOptions, formIsValid } from '../selectors';
import { AutocompleteFieldType, initialState, PassengerType } from '../../../state';
import { changeAutocompleteSuggestions } from '../autocomplete/actions';
import rootReducer from '../../reducer';
import { getAltLayout } from '../../../utils';
import { AutocompleteSuggestion } from '../../../services/models/AutocompleteSuggestion';
import { Airport } from '../../../services/models/Airport';

const getStore = () => {
	return createStore(rootReducer);
};

const correctAirport: Airport = {
	name: 'Москва',
	nameEn: 'Moscow',
	IATA: 'MOW',
	airportRating: null,
	isAggregation: null,
	properName: null,
	properNameEn: null,
	city: null,
	country: null
};

const anotherCorrectAirport: Airport = {
	name: 'Саратов',
	nameEn: 'Saratov',
	IATA: 'RTW',
	airportRating: null,
	isAggregation: null,
	properName: null,
	properNameEn: null,
	city: null,
	country: null
};

const wrongAirport: AutocompleteSuggestion = {
	airport: {
		IATA: 'MOW',
		airportRating: null,
		isAggregation: null,
		name: null,
		nameEn: null,
		properName: null,
		properNameEn: null,
		city: null,
		country: null
	},
	isDirect: false
};

/* global describe */
/* global it */
/* global expect */
describe('store/form/selectors', () => {
	it('should return `true` when form is filled out', () => {
		const store = getStore();
		const state = store.getState();

		state.form.autocomplete.departure.airport = correctAirport;
		state.form.autocomplete.arrival.airport = anotherCorrectAirport;
		state.form.dates.departure.date = moment();
		state.form.passengers[PassengerType.Adult] = {
			title: null,
			ageTitle: null,
			code: null,
			count: 1
		};

		expect(formIsValid(state)).toEqual(true);
	});

	describe('departure', () => {
		it('should return empty array on initial state', () => {
			expect(getDepartureOptions(initialState)).toEqual([]);
		});

		it('should return empty array when wrong options given', () => {
			const options: AutocompleteSuggestion[] = [wrongAirport];
			const store = getStore();

			store.dispatch(changeAutocompleteSuggestions(options, AutocompleteFieldType.Departure));

			expect(getDepartureOptions(store.getState())).toEqual([]);
		});

		it('should return proper array', () => {
			const options: AutocompleteSuggestion[] = [{ airport: correctAirport, isDirect: false }];
			const store = createStore(rootReducer, initialState);

			store.dispatch(changeAutocompleteSuggestions(options, AutocompleteFieldType.Departure));

			expect(getDepartureOptions(store.getState())).toEqual([{
				label: 'МоскваMoscowMOW' + getAltLayout('Москва'),
				value: { airport: correctAirport, isDirect: false }
			}]);
		});
	});

	describe('arrival', () => {
		it('should return empty array on initial state', () => {
			expect(getArrivalOptions(initialState)).toEqual([]);
		});

		it('should return empty array when wrong options given', () => {
			const options: AutocompleteSuggestion[] = [wrongAirport];
			const store = createStore(rootReducer, initialState);

			store.dispatch(changeAutocompleteSuggestions(options, AutocompleteFieldType.Arrival));

			expect(getArrivalOptions(store.getState())).toEqual([]);
		});

		it('should return proper array', () => {
			const options: AutocompleteSuggestion[] = [{ airport: correctAirport, isDirect: false }];
			const store = createStore(rootReducer, initialState);

			store.dispatch(changeAutocompleteSuggestions(options, AutocompleteFieldType.Arrival));

			expect(getArrivalOptions(store.getState())).toEqual([{
				label: 'МоскваMoscowMOW' + getAltLayout('Москва'),
				value: { airport: correctAirport, isDirect: false }
			}]);
		});
	});
});
