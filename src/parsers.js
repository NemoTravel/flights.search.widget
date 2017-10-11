export const parseNemoAutocompleteOptions = (response) => {
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

export const parseWebskyAutocompleteOptions = (response, searchType, locale = 'en') => {
	let options = [];
	
	if (response && response[searchType] && response[searchType] instanceof Array) {
		response[searchType].map(item => {
			if (item.airports && item.airports instanceof Array) {
				item.airports.map(airport => {
					const airportObject = {
						IATA: airport.codeEn,
						name: locale === 'ru' ? airport.nameRu : airport.nameEn,
						nameEn: airport.nameEn,
						country: {
							name: locale === 'ru' ? item.countryNameRu : item.countryNameEn
						}
					};
					
					options.push({
						airport: airportObject,
						isDirect: !!item.popular
					});
				});
			}
			else {
				const airportObject = {
					IATA: item.codeEn,
					name: locale === 'ru' ? item.nameRu : item.nameEn,
					nameEn: item.nameEn,
					country: {
						name: locale === 'ru' ? item.countryNameRu : item.countryNameEn
					}
				};

				options.push({
					airport: airportObject,
					isDirect: !!item.popular
				});
			}
		});
	}
	
	return options;
};