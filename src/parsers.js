export const parseAutocompleteOptions = (options = [], guide = {}) => {
	const { airports, countries } = guide;

	return options
		.filter(({ IATA }) => IATA in airports && airports[IATA].name) // Ignore options without information about airport.
		.map(({ IATA, directFlight, isCity }) => {
			airports[IATA].country = countries[airports[IATA].countryCode];
			airports[IATA].isCity = isCity;
	
			return {
				airport: airports[IATA],
				isDirect: directFlight
			};
		});
};

export const parseNemoAutocompleteOptions = response => {
	let options = [];
	
	if (response && response.guide.autocomplete.iata instanceof Array) {
		options = parseAutocompleteOptions(response.guide.autocomplete.iata, response.guide);
	}
	
	return options;
};

export const parseWebskyAutocompleteOptions = response => {
	let options = [];
	
	if (response && response.proxy.websky.cities instanceof Array) {
		options = parseAutocompleteOptions(response.proxy.websky.cities, response.guide);
	}
	
	return options;
};