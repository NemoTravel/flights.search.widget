import { createSelector } from 'reselect';
import { i18n } from 'utils';

/**
 * Selectors are like `computed` objects in KnockoutJS.
 * They recalculate some data only if the corresponding part of the state tree has been changed.
 * 
 * This allows us to compose some data from different parts of state tree 
 * and do not worry about how many times needed data has been calculated.
 */

function getConfig(state) {
	return state.system;
}

/**
 * --------------------------------------------------------------------------------------------------------
 * PASSENGERS ---------------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------------------------
 */
function getPassengersConfig(state) {
	return state.form.passengers;
}

export const getPassengersArray = createSelector(
	[ getPassengersConfig, getConfig ],
	(passengersConfig = {}, systemConfig = {}) => {
		let result = [];
		
		for (let passType in passengersConfig) {
			if (passengersConfig.hasOwnProperty(passType)) {
				let passConfig = passengersConfig[passType];
				
				if (passConfig.code !== 'INS' || systemConfig.enableInfantsWithSeats) {
					result.push(passConfig);
				}
			}
		}
		
		return result;
	}
);

/**
 * Total count of selected passengers on the search form.
 */
export const getTotalPassengersCount = createSelector(
	[ getPassengersArray ],
	(passengersArray = []) => passengersArray.reduce((result, passenger) => result + parseInt(passenger.count), 0)
);

/**
 * Dynamic title for passengers dropdown on the search form.
 */
export const getPassengersTitle = createSelector(
	[ getTotalPassengersCount ],
	(totalCount = 0) => {
		let result = '';

		if (totalCount === 0 || totalCount > 4) {
			result = `${totalCount} ${i18n('form', 'passengers_1')}`;
		}
		else if (totalCount === 1) {
			result = `${totalCount} ${i18n('form', 'passengers_2')}`;
		}
		else {
			result = `${totalCount} ${i18n('form', 'passengers_3')}`;
		}

		return result;
	}
);

export const getPassengersCounterAvailability = createSelector(
	[ getPassengersConfig, getTotalPassengersCount ],
	(passengersConfig = {}, totalCount = 0) => {
		let result = {};
		
		for (let passType in passengersConfig) {
			if (passengersConfig.hasOwnProperty(passType)) {
				let currentPassConfig = passengersConfig[passType];
				let canAdd = true;
				let canRemove = true;
				
				if (totalCount >= 6) {
					canAdd = false;
				}
				
				if (totalCount <= 0 || currentPassConfig.count <= 0) {
					canRemove = false;
				}

				switch (passType) {
					case 'ADT':
						if (
							currentPassConfig.count <= passengersConfig.INF.count || 
							currentPassConfig.count <= passengersConfig.INS.count ||
							passengersConfig.CLD.count
						) {
							canRemove = false;
						}
						break;
						
					case 'CLD':
						if (passengersConfig.ADT.count <= 0) {
							canAdd = false;
						}
						break;

					case 'INF':
					case 'INS':
						if (currentPassConfig.count >= passengersConfig.ADT.count) {
							canAdd = false;
						}
						break;
				}
				
				result[passType] = {
					canAdd,
					canRemove
				};
			}
		}
		
		return result;
	}
);

/**
 * --------------------------------------------------------------------------------------------------------
 * DATES --------------------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------------------------
 */
function getDepartureDate(state) {
	return state.form.dates.departure.date;
}

function getReturnDate(state) {
	return state.form.dates.return.date;
}

/**
 * Get an array of MomentJS dates between the departure and the return date.
 */
export const getDatesBetweenDepartureAndReturn = createSelector(
	[getDepartureDate, getReturnDate],
	(departureDate, returnDate) => {
		let result = [];
		
		if (departureDate && returnDate) {
			let startDate = departureDate.clone();
			let endDate = returnDate.clone();

			result.push(departureDate);
			
			while (startDate.add(1, 'days').diff(endDate) < 0) {
				result.push(startDate.clone());
			}

			result.push(returnDate);
		}
		else if (departureDate) {
			result.push(departureDate);
		}
		else if (returnDate) {
			result.push(returnDate);
		}
		
		return result;
	}
);

/**
 * --------------------------------------------------------------------------------------------------------
 * FORM ---------------------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------------------------
 */
function getForm(state) {
	return state.form;
}

/**
 * Check if search form data is valid and ready for further operations.
 * 
 * Checking for:
 * - valid departure and arrival airports
 * - valid departure date
 * - valid number of selected passengers
 */
export const formIsValid = createSelector(
	[ getForm, getTotalPassengersCount ],
	(form, totalPassengersCount) => {
		let isValid = true;
		
		if (totalPassengersCount <= 0) {
			isValid = false;
		}
		else if (!form.dates.departure.date) {
			isValid = false;
		}
		else if (!form.autocomplete.departure.airport) {
			isValid = false;
		}
		else if (!form.autocomplete.arrival.airport) {
			isValid = false;
		}
		
		return isValid;
	}
);