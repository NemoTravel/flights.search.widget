import { Reducer } from 'redux-testkit'; // tslint:disable-line
import autocompleteReducer from '../reducer';
import { AIRPORT_SELECTED } from '../../../actions';
import {
	startAutocompleteLoading,
	finishAutocompleteLoading,
	setSelectedAirport,
	changeAutocompleteSuggestions,
	setAirportInPreviousSearchGroup
} from '../actions';
import { AutocompleteFieldType, autocompleteState } from '../../../../state';
import { Airport } from '../../../../services/models/Airport';
import { AutocompleteSuggestion } from '../../../../services/models/AutocompleteSuggestion';

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

/* global describe */
/* global it */
/* global expect */
describe('store/form/autocomplete', () => {
	it('should not affect state', () => {
		Reducer(autocompleteReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(autocompleteState);
	});

	it('should not affect state if no `autocompleteType` provided', () => {
		Reducer(autocompleteReducer).expect({ type: AIRPORT_SELECTED }).toReturnState(autocompleteState);
	});

	describe('departure', () => {
		it('should handle `AUTOCOMPLETE_LOADING_STARTED`', () => {
			Reducer(autocompleteReducer).expect(startAutocompleteLoading(AutocompleteFieldType.Departure)).toChangeInState({ departure: { isLoading: true } });
		});

		it('should handle `AUTOCOMPLETE_LOADING_FINISHED`', () => {
			Reducer(autocompleteReducer).expect(finishAutocompleteLoading(AutocompleteFieldType.Departure)).toChangeInState({ departure: { isLoading: false } });
		});

		it('should handle `AIRPORT_SELECTED`', () => {
			Reducer(autocompleteReducer).expect(setSelectedAirport(correctAirport, AutocompleteFieldType.Departure)).toChangeInState({ departure: { airport: correctAirport } });
		});

		it('should handle `AUTOCOMPLETE_SUGGESTIONS_CHANGED`', () => {
			const suggestions: AutocompleteSuggestion[] = [{
				isDirect: false,
				airport: correctAirport
			}];

			Reducer(autocompleteReducer).expect(changeAutocompleteSuggestions(suggestions, AutocompleteFieldType.Departure)).toChangeInState({ departure: { suggestions: suggestions } });
		});

		it('should handle `AUTOCOMPLETE_PUSH_TO_PREVIOUS`', () => {
			const airport = { name: 'Domodedovo', IATA: 'MOW' },
				pool = { MOW: airport };

			Reducer(autocompleteReducer).expect(setAirportInPreviousSearchGroup(pool)).toChangeInState({
				defaultGroups: {
					previousSearches: {
						options: {
							MOW: airport
						}
					}
				}
			});
		});
	});

	describe('arrival', () => {
		it('should handle `AUTOCOMPLETE_LOADING_STARTED`', () => {
			Reducer(autocompleteReducer).expect(startAutocompleteLoading(AutocompleteFieldType.Arrival)).toChangeInState({ arrival: { isLoading: true } });
		});

		it('should handle `AUTOCOMPLETE_LOADING_FINISHED`', () => {
			Reducer(autocompleteReducer).expect(finishAutocompleteLoading(AutocompleteFieldType.Arrival)).toChangeInState({ arrival: { isLoading: false } });
		});

		it('should handle `AIRPORT_SELECTED`', () => {
			Reducer(autocompleteReducer).expect(setSelectedAirport(correctAirport, AutocompleteFieldType.Arrival)).toChangeInState({ arrival: { airport: correctAirport } });
		});

		it('should handle `AUTOCOMPLETE_SUGGESTIONS_CHANGED`', () => {
			const suggestions: AutocompleteSuggestion[] = [{
				isDirect: false,
				airport: correctAirport
			}];

			Reducer(autocompleteReducer).expect(changeAutocompleteSuggestions(suggestions, AutocompleteFieldType.Arrival)).toChangeInState({ arrival: { suggestions: suggestions } });
		});
	});
});
