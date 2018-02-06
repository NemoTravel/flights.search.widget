import { AvailableDateResponse, ResponseWithAvailableDates } from '../responses/AvailableDates';

export const parseDatesAvailability = (response: ResponseWithAvailableDates): AvailableDateResponse[] => {
	let availableDates: AvailableDateResponse[] = [];

	if (response && response.flights && response.flights.availability && response.flights.availability.dates) {
		availableDates = response.flights.availability.dates;
	}

	return availableDates;
};
