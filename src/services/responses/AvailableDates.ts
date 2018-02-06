import { SystemResponse } from './System';

export interface AvailableDateResponse {
	date: string;
}

export interface ResponseWithAvailableDates extends SystemResponse {
	flights?: {
		availability?: {
			dates?: AvailableDateResponse[];
		};
	};
}
