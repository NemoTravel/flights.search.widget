export const parseAirportFromGuide = (response: any, IATA: string) => {
	let airport = null;

	if (response && IATA in response.guide.airports) {
		const { airports, countries } = response.guide;

		airport = airports[IATA];
		airport.country = countries[airport.countryCode];
	}

	return airport;
};

export const parseAutocompleteOptions = (response: any, aggregationOnly: boolean) => {
	const options: any[] = [];

	if (response && response.guide.autocomplete.iata instanceof Array) {
		const { airports, countries, cities, aggregationMap } = response.guide;
		const iataMap: any = {};

		// Sometimes, city has it's own list of airports (ex: Moscow (MOW)), so we have to process them too.
		const cityHasAirports = (responseAirport: any) => {
			if (
				responseAirport.isCity &&
				cities.hasOwnProperty(responseAirport.cityId) &&
				cities[responseAirport.cityId].airports instanceof Array
			) {
				return cities[responseAirport.cityId].airports;
			}

			return [];
		};

		const processAirport = ({ IATA, directFlight, isCity }: any) => {
			const airport = airports[IATA];
			const cityIATA = cities.hasOwnProperty(airport.cityId) ? cities[airport.cityId].IATA : null;
			// aggregationMap is null for nemo autocomplete
			const aggregationCity = aggregationMap && aggregationMap.hasOwnProperty(cityIATA) && aggregationMap[cityIATA].hasOwnProperty(airport.IATA) ? aggregationMap[cityIATA] : false;

			airport.country = countries[airport.countryCode];
			airport.isCity = !!isCity;
			airport.insideAggregationAirport = cityIATA &&	aggregationCity;

			// Remember all processed IATA codes.
			iataMap[IATA] = true;

			if (!aggregationOnly ||	!aggregationCity ||	typeof aggregationCity == "object" && Object.keys(aggregationCity).length > 1) {
				return { airport, isDirect: !!directFlight };
			}
			else {
				return null;
			}
		};

		response.guide.autocomplete.iata
			.filter(({ IATA }: any): boolean => !iataMap.hasOwnProperty(IATA) && airports.hasOwnProperty(IATA) && airports[IATA].name)
			.map((responseAirport: any): any => {
				options.push(processAirport(responseAirport));

				cityHasAirports(responseAirport)
					.filter(({ IATA }: any): boolean => !iataMap.hasOwnProperty(IATA) && airports.hasOwnProperty(IATA) && airports[IATA].name)
					.map((cityResponseAirport: any): any => options.push(processAirport(cityResponseAirport)));
			});
	}

	return options;
};

export const parseNearestAirport = (response: any) => {
	let airport = null;

	if (response && response.guide && response.guide.nearestAirport) {
		airport = parseAirportFromGuide(response, response.guide.nearestAirport);
	}

	return airport;
};
