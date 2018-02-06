import { Airport } from './Airport';

export interface AutocompleteSuggestion {
	airport: Airport;
	isDirect: boolean;
}
