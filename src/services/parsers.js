export const parseAirportFromGuide = (response, IATA) => {
	let airport = null;

	if (response && IATA in response.guide.airports) {
		const { airports, countries } = response.guide;

		airport = airports[IATA];
		airport.country = countries[airport.countryCode];
	}

	return airport;
};

export const parseAutocompleteOptions = response => {
	const options = [];

	if (response && response.guide.autocomplete.iata instanceof Array) {
		const { airports, countries, cities } = response.guide;
		const iataMap = {};

		// Sometimes, city has it's own list of airports (ex: Moscow (MOW)), so we have to process them too.
		const cityHasAirports = responseAirport => {
			if (
				responseAirport.isCity &&
				cities.hasOwnProperty(responseAirport.cityId) &&
				cities[responseAirport.cityId].airports instanceof Array
			) {
				return cities[responseAirport.cityId].airports;
			}

			return [];
		};

		const processAirport = ({ IATA, directFlight, isCity }) => {
			const airport = airports[IATA];

			airport.country = countries[airport.countryCode];
			airport.isCity = !!isCity;

			// Remember all processed IATA codes.
			iataMap[IATA] = true;

			return { airport, isDirect: !!directFlight };
		};

		response.guide.autocomplete.iata
			.filter(({ IATA }) => !iataMap.hasOwnProperty(IATA) && airports.hasOwnProperty(IATA) && airports[IATA].name)
			.map(responseAirport => {
				options.push(processAirport(responseAirport));

				cityHasAirports(responseAirport)
					.filter(({ IATA }) => !iataMap.hasOwnProperty(IATA) && airports.hasOwnProperty(IATA) && airports[IATA].name)
					.map(cityResponseAirport => options.push(processAirport(cityResponseAirport)));
			});
	}

	return options;
};

export const parseNearestAirport = response => {
	let airport = null;

	if (response && response.guide && response.guide.nearestAirport) {
		airport = parseAirportFromGuide(response, response.guide.nearestAirport);
	}

	return airport;
};
