export const parseAutocompleteOptions = (response) => {
	let options = [];
	
	if (response && response.guide.autocomplete.iata instanceof Array) {
		const { airports, countries } = response.guide;
		const { iata } = response.guide.autocomplete;

		options = iata
			// Ignore options without information about airport.
			.filter(({ IATA }) => IATA in airports && airports[IATA].name)
			.map(({ IATA, directFlight, isCity }) => {
				airports[IATA].country = countries[airports[IATA].countryCode];
				airports[IATA].isCity = isCity;
				
				return {
					airport: airports[IATA],
					isDirect: directFlight
				};
			});
	}
	
	return options;
};