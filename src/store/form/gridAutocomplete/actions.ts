import { AutocompleteSuggestion } from '../../../services/models/AutocompleteSuggestion';
import { SET_GRID_AUTOCOMPLETE } from '../../actions';
import { Action } from 'redux';

export interface GridAction extends Action {
	type: string;
	IATA?: string;
	suggestions?: AutocompleteSuggestion[];
}

export const setAutocompleteSuggestionsForGrid = (IATA: string, suggestions: AutocompleteSuggestion[]) => {
	const departureIATA = !!IATA ? IATA : 'default';

	return {
		type: SET_GRID_AUTOCOMPLETE,
		IATA: departureIATA,
		suggestions
	};
};
