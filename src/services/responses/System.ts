export interface SystemResponse {
	system?: {
		info: {
			response: {
				responseTime: number;
				timestamp: number;
			};
			user: {
				agencyID: number;
				userID: number;
				isB2B: boolean;
				status: string;
				settings: {
					agencyCurrency: string;
					currentCurrency: string;
					currentLanguage: string;
					googleMapsApiKey: string;
					googleMapsClientId: string;
					showFullFlightsResults: boolean;
				};
			};
		};
	};
}
