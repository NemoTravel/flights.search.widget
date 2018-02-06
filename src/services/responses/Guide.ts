import { CountryResponse } from './Country';
import { AirportResponse } from './Airport';
import { CityResponse, CityResponseAirportItem } from './City';
import { SystemResponse } from './System';

export interface AutocompleteAirportItem extends CityResponseAirportItem {
	cityId?: number;
	isCity?: boolean;
	directFlight?: boolean;
}

export interface AggregationMap {
	[cityIATA: string]: {
		[airportIATA: string]: AirportResponse;
	};
}

export interface GuideResponse {
	airports?: {
		[IATA: string]: AirportResponse;
	};
	cities?: {
		[cityId: number]: CityResponse;
	};
	countries?: {
		[IATA: string]: CountryResponse;
	};
	autocomplete?: {
		iata: AutocompleteAirportItem[];
	};
	aggregationMap?: AggregationMap;
	nearestAirport?: string;
}

export interface ResponseWithGuide extends SystemResponse {
	guide?: GuideResponse
}
