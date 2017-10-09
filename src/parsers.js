export const parseAutocompleteOptions = (response) => {
	let options = [];
	
	if (response && response.guide.autocomplete.iata instanceof Array) {
		const { airports, countries } = response.guide;
		const { iata } = response.guide.autocomplete;

		options = iata
			// Ignore options without information about airport.
			.filter(({ IATA }) => IATA in airports && airports[IATA].name)
			.map(({ IATA, directFlight }) => {
				return {
					value: {
						airport: airports[IATA],
						country: countries[airports[IATA].countryCode],
						isDirect: directFlight
					},
					label: airports[IATA].name + airports[IATA].nameEn + airports[IATA].IATA
				};
			});
	}
	
	return options;
};