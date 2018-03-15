import * as moment from 'moment';
import { createStore } from 'redux';

import { getSuggestionOptions, formIsValid } from '../selectors';
import { AutocompleteFieldType, initialState, PassengerType } from '../../../state';
import { changeAutocompleteSuggestions } from '../segments/autocomplete/actions';
import rootReducer from '../../reducer';
import { getAltLayout } from '../../../utils';
import { AutocompleteSuggestion } from '../../../services/models/AutocompleteSuggestion';
import { Airport } from '../../../services/models/Airport';
import { addSegment } from '../segments/actions';

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

		state.form.segments[0].autocomplete.departure.airport = correctAirport;
		state.form.segments[0].autocomplete.arrival.airport = anotherCorrectAirport;
		state.form.segments[0].dates.departure.date = moment();
		state.form.passengers[PassengerType.Adult] = {
			title: null,
			ageTitle: null,
			code: null,
			count: 1
		};

		expect(formIsValid(state)).toEqual(true);
	});

	describe('suggestions options', () => {
		it('should return empty array when wrong options given', () => {
			const options: AutocompleteSuggestion[] = [wrongAirport];
			const store = getStore();

			store.dispatch(changeAutocompleteSuggestions(options, AutocompleteFieldType.Departure));

			expect(getSuggestionOptions(store.getState().form.segments[0].autocomplete.departure)).toEqual([]);
		});

		it('should return proper array for departure', () => {
			const options: AutocompleteSuggestion[] = [{ airport: correctAirport, isDirect: false }];
			const store = createStore(rootReducer, initialState);

			store.dispatch(addSegment());

			store.dispatch(changeAutocompleteSuggestions(options, AutocompleteFieldType.Departure));

			expect(getSuggestionOptions(store.getState().form.segments[0].autocomplete.departure)).toEqual([{
				label: 'МоскваMoscowMOW' + getAltLayout('Москва'),
				value: { airport: correctAirport, isDirect: false }
			}]);
		});

		it('should return proper array for arrival', () => {
			const options: AutocompleteSuggestion[] = [{ airport: correctAirport, isDirect: false }];
			const store = createStore(rootReducer, initialState);

			store.dispatch(addSegment());

			store.dispatch(changeAutocompleteSuggestions(options, AutocompleteFieldType.Arrival));

			expect(getSuggestionOptions(store.getState().form.segments[0].autocomplete.arrival)).toEqual([{
				label: 'МоскваMoscowMOW' + getAltLayout('Москва'),
				value: { airport: correctAirport, isDirect: false }
			}]);
		});
	});
});
