export interface CityResponseAirportItem {
	IATA: string;
}

export interface CityResponse {
	IATA: string;
	airports: CityResponseAirportItem[];
	countryCode: string;
	id: number;
	name: string;
	nameEn: string;
}
