export const parseDatesAvailability = response => {
	let availableDates = {};
	
	if (response && response.flights && response.flights.availability && response.flights.availability.dates) {
		availableDates = response.flights.availability.dates;
	}
	
	return availableDates;
};