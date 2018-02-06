import { Country } from './Country';
import { City } from './City';

export interface Airport {
	IATA: string;
	airportRating: string;
	isAggregation: boolean;
	name: string;
	nameEn: string;
	properName: string;
	properNameEn: string;
	city: City;
	country: Country;
	isCity?: boolean;
	insideAggregationAirport?: boolean;
}
