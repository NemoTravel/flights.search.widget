export const systemState = {
	rootElement: null,
	API_URL: '',
	routingGrid: null,
	locale: 'en',
	showAirportIATA: false,
	readOnlyAutocomplete: false,
	enableInfantsWithSeats: false
};

export const blockVisibilityState = {
	search: true,
	registration: false,
	bookings: false
};

export const initialState = {
	system: systemState,
	form: {
		blockVisibility: blockVisibilityState
	}
};