import { AutocompleteAirportItem, ResponseWithGuide } from './responses/Guide';
import { CityResponseAirportItem } from './responses/City';
import { Airport } from './models/Airport';
import { AutocompleteSuggestion } from './models/AutocompleteSuggestion';

export const parseAirportFromGuide = (response: ResponseWithGuide, IATA: string): Airport => {
	let airport: Airport = null;

	if (response && IATA in response.guide.airports) {
		const { airports, countries, cities } = response.guide;
		const airportFromResponse = airports[IATA];

		airport = {
			IATA: airportFromResponse.IATA,
			airportRating: airportFromResponse.airportRating,
			isAggregation: airportFromResponse.isAggregation,
			name: airportFromResponse.name,
			nameEn: airportFromResponse.nameEn,
			properName: airportFromResponse.properName,
			properNameEn: airportFromResponse.properNameEn,
			city: cities[airportFromResponse.cityId],
			country: countries[airportFromResponse.countryCode]
		};
	}

	return airport;
};

export const parseAutocompleteOptions = (response: ResponseWithGuide, aggregationOnly: boolean) => {
	const options: AutocompleteSuggestion[] = [];

	if (response && response.guide.autocomplete.iata instanceof Array) {
		const { airports, countries, cities, aggregationMap } = response.guide;
		const iataMap: { [IATA: string]: boolean } = {};
		let lastAggregationCityIATA = '';

		// Sometimes, city has it's own list of airports (ex: Moscow (MOW)), so we have to process them too.
		const cityHasAirports = (responseAirport: AutocompleteAirportItem): CityResponseAirportItem[] => {
			if (
				responseAirport.isCity &&
				cities.hasOwnProperty(responseAirport.cityId) &&
				cities[responseAirport.cityId].airports instanceof Array
			) {
				return cities[responseAirport.cityId].airports;
			}

			return [];
		};

		const processAirport = ({ IATA, directFlight, isCity }: AutocompleteAirportItem): AutocompleteSuggestion => {
			const airport = parseAirportFromGuide(response, IATA);
			const cityIATA = airport.city ? cities[airport.city.id].IATA : null;
			// aggregationMap is null for nemo autocomplete
			const aggregationCity = aggregationMap && aggregationMap.hasOwnProperty(cityIATA) && aggregationMap[cityIATA].hasOwnProperty(airport.IATA) ? aggregationMap[cityIATA] : false;

			airport.country = countries[airport.country.code];
			airport.isCity = isCity;
			airport.insideAggregationAirport = cityIATA && !!aggregationCity || (airport.city && airport.city.IATA === lastAggregationCityIATA);

			// Remember all processed IATA codes.
			iataMap[IATA] = true;

			if (!aggregationOnly || !aggregationCity || Object.keys(aggregationCity).length > 1) {
				if (airport.isAggregation) {
					lastAggregationCityIATA = airport.IATA;
				}

				return { airport: airport, isDirect: directFlight };
			}
			else {
				return null;
			}
		};

		response.guide.autocomplete.iata
			.filter(({ IATA }: AutocompleteAirportItem): boolean => !iataMap.hasOwnProperty(IATA) && airports.hasOwnProperty(IATA) && !!airports[IATA].name)
			.map((responseAirport: AutocompleteAirportItem): void => {
				options.push(processAirport(responseAirport));

				cityHasAirports(responseAirport)
					.filter(({ IATA }: CityResponseAirportItem): boolean => !iataMap.hasOwnProperty(IATA) && airports.hasOwnProperty(IATA) && !!airports[IATA].name)
					.map((cityResponseAirport: CityResponseAirportItem): void => {
						options.push(processAirport(cityResponseAirport));
					});
			});
	}

	return options;
};

export const parseNearestAirport = (response: ResponseWithGuide): Airport => {
	let airport: Airport = null;

	if (response && response.guide && response.guide.nearestAirport) {
		airport = parseAirportFromGuide(response, response.guide.nearestAirport);
	}

	return airport;
};
