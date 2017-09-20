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

export const autocompleteState = {
	departure: {
		isLoading: false,
		suggestions: [],
		inputValue: '',
		airport: null
	},
	arrival: {
		isLoading: false,
		suggestions: [],
		inputValue: '',
		airport: null
	}
};

export const initialState = {
	system: systemState,
	form: {
		autocomplete: autocompleteState,
		blockVisibility: blockVisibilityState
	}
};