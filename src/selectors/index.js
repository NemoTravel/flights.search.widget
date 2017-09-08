import { createSelector } from 'reselect';

/**
 * Selectors are like `computed` objects in KnockoutJS.
 * They recalculate some data only if the corresponding part of the state tree has been changed.
 * 
 * This allows us to compose some data from different parts of state tree 
 * and do not worry about how many times needed data has been calculated.
 */

function getPassengersConfig(state) {
	return state.form.search.passengers;
}

function getConfig(state) {
	return state.system;
}

export const getPassengersArray = createSelector(
	[ getPassengersConfig, getConfig ],
	(passengersConfig = {}, systemConfig = {}) => {
		let result = [];
		
		for (let passType in passengersConfig) {
			if (passengersConfig.hasOwnProperty(passType)) {
				let passConfig = passengersConfig[passType];
				
				if (passConfig.code !== 'INS' || systemConfig.form.enableInfantsWithSeats) {
					result.push(passConfig);
				}
			}
		}
		
		return result;
	}
);

export const getTotalPassengersCount = createSelector(
	[ getPassengersArray ],
	(passengersArray = []) => {
		let result = 0;

		passengersArray.map((passenger) => {
			result += parseInt(passenger.count);
		});

		return result;
	}
);

export const getPassengersTitle = createSelector(
	[ getTotalPassengersCount ],
	(totalCount = 0) => {
		let result = '';

		if (totalCount === 0 || totalCount > 4) {
			result = totalCount + ' Пассажиров';
		}
		else if (totalCount === 1) {
			result = totalCount + ' Пассажир';
		}
		else {
			result = totalCount + ' Пассажира';
		}

		return result;
	}
);