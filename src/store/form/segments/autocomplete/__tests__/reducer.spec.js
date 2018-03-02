import { autocompleteState } from 'state';
import autocompleteReducer from '../reducer';
import { AIRPORT_SELECTED } from '../../../actions';
import {
	startAutocompleteLoading,
	finishAutocompleteLoading,
	setSelectedAirport,
	changeAutocompleteSuggestions,
	setAirportInPreviousSearchGroup
} from '../actions';
import { Reducer } from 'redux-testkit';

/* global describe */
/* global it */
/* global expect */
describe('store/form/autocomplete', () => {
	it('should have initial state', () => {
		expect(autocompleteReducer()).toEqual(autocompleteState);
	});

	it('should not affect state', () => {
		Reducer(autocompleteReducer).expect({ type: 'WRONG_TYPE' }).toReturnState(autocompleteState);
	});

	it('should not affect state if no `autocompleteType` provided', () => {
		Reducer(autocompleteReducer).expect({ type: AIRPORT_SELECTED }).toReturnState(autocompleteState);
	});

	describe('departure', () => {
		it('should handle `AUTOCOMPLETE_LOADING_STARTED`', () => {
			Reducer(autocompleteReducer).expect(startAutocompleteLoading('departure')).toChangeInState({ departure: { isLoading: true } });
		});

		it('should handle `AUTOCOMPLETE_LOADING_FINISHED`', () => {
			Reducer(autocompleteReducer).expect(finishAutocompleteLoading('departure')).toChangeInState({ departure: { isLoading: false } });
		});

		it('should handle `AIRPORT_SELECTED`', () => {
			const airport = { name: 'Domodedovo', IATA: 'MOW' };

			Reducer(autocompleteReducer).expect(setSelectedAirport(airport, 'departure')).toChangeInState({ departure: { airport: airport } });
		});

		it('should handle `AUTOCOMPLETE_SUGGESTIONS_CHANGED`', () => {
			const suggestions = { name: 'Domodedovo', IATA: 'MOW' };

			Reducer(autocompleteReducer).expect(changeAutocompleteSuggestions(suggestions, 'departure')).toChangeInState({ departure: { suggestions: suggestions } });
		});

		it('should handle `AUTOCOMPLETE_PUSH_TO_PREVIOUS`', () => {
			const airport = { name: 'Domodedovo', IATA: 'MOW' },
				pool = { MOW: airport };

			Reducer(autocompleteReducer).expect(setAirportInPreviousSearchGroup(pool, 'defaultGroups')).toChangeInState({
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
			Reducer(autocompleteReducer).expect(startAutocompleteLoading('arrival')).toChangeInState({ arrival: { isLoading: true } });
		});

		it('should handle `AUTOCOMPLETE_LOADING_FINISHED`', () => {
			Reducer(autocompleteReducer).expect(finishAutocompleteLoading('arrival')).toChangeInState({ arrival: { isLoading: false } });
		});

		it('should handle `AIRPORT_SELECTED`', () => {
			const airport = { name: 'Domodedovo', IATA: 'MOW' };

			Reducer(autocompleteReducer).expect(setSelectedAirport(airport, 'arrival')).toChangeInState({ arrival: { airport: airport } });
		});

		it('should handle `AUTOCOMPLETE_SUGGESTIONS_CHANGED`', () => {
			const suggestions = { name: 'Domodedovo', IATA: 'MOW' };

			Reducer(autocompleteReducer).expect(changeAutocompleteSuggestions(suggestions, 'arrival')).toChangeInState({ arrival: { suggestions: suggestions } });
		});
	});
});
