import { createSelector } from 'reselect';
import { i18n } from 'utils';

function getPassengersConfig(state) {
	return state.form.passengers;
}

export const getPassengersArray = createSelector(
	[ getPassengersConfig ],
	(passengersConfig = {}) => {
		let result = [];

		for (let passType in passengersConfig) {
			if (passengersConfig.hasOwnProperty(passType)) {
				result.push(passengersConfig[passType]);
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

/**
 * Check if passenger counter can be increased or decreased.
 *
 * Return example:
 * {
 *   ADT: {
 *     canIncrease: true,
 *     canDecrease: false
 *   },
 *   INF: {
 *     canIncrease: false,
 *     canDecrease: false
 *   },
 *   ...
 * }
 */
export const getPassengersCounterAvailability = createSelector(
	[ getPassengersConfig, getTotalPassengersCount ],
	(passengersConfig = {}, totalCount = 0) => {
		let result = {};

		for (let passType in passengersConfig) {
			if (passengersConfig.hasOwnProperty(passType)) {
				let currentPassConfig = passengersConfig[passType];
				let canIncrease = true;
				let canDecrease = true;

				if (totalCount >= 6) {
					canIncrease = false;
				}

				if (totalCount <= 0 || currentPassConfig.count <= 0) {
					canDecrease = false;
				}

				switch (passType) {
					case 'ADT':
						if (
							currentPassConfig.count <= passengersConfig.INF.count ||
							currentPassConfig.count <= passengersConfig.INS.count ||
							currentPassConfig.count <= 1
						) {
							canDecrease = false;
						}
						break;

					case 'INS':
					case 'CLD':
						if (passengersConfig.ADT.count <= 0) {
							canIncrease = false;
						}
						break;

					case 'INF':
						if (currentPassConfig.count >= passengersConfig.ADT.count) {
							canIncrease = false;
						}
						break;
				}

				result[passType] = {
					canIncrease,
					canDecrease
				};
			}
		}

		return result;
	}
);