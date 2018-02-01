import { createSelector } from 'reselect';
import { i18n } from '../../../utils';
import { ApplicationState, PassengersState, PassengerState, PassengerType, WebskyPassengerType } from '../../../state';

const getPassengersConfig = (state: ApplicationState): PassengersState => {
	return state.form.passengers;
};

export const getPassengersArray = createSelector(
	[ getPassengersConfig ],
	(passengersConfig: PassengersState): PassengerState[] => {
		const result: PassengerState[] = [];

		for (const passType in passengersConfig) {
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
	(passengersArray: PassengerState[]): number => passengersArray.reduce((result: number, passenger: PassengerState) => result + passenger.count, 0)
);

/**
 * Dynamic title for passengers dropdown on the search form.
 */
export const getPassengersTitle = createSelector(
	[ getTotalPassengersCount ],
	(totalCount: number): string => {
		const PASSENGERS_COUNT_PLURAL = 4;
		let result = '';

		if (totalCount === 0 || totalCount > PASSENGERS_COUNT_PLURAL) {
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

export interface PassengerCounterAvailability {
	canIncrease: boolean;
	canDecrease: boolean;
}

export interface PassengersCounterAvailability {
	[passengerType: string]: PassengerCounterAvailability;
}

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
	(passengersConfig: PassengersState, totalCount: number): PassengersCounterAvailability => {
		const result: PassengersCounterAvailability = {};
		const MAX_NUM_OF_PASSENGERS = 6;

		for (const passType in passengersConfig) {
			if (passengersConfig.hasOwnProperty(passType)) {
				const currentPassConfig: PassengerState = passengersConfig[passType];
				let canIncrease = true;
				let canDecrease = true;

				if (totalCount >= MAX_NUM_OF_PASSENGERS) {
					canIncrease = false;
				}

				if (totalCount <= 0 || currentPassConfig.count <= 0) {
					canDecrease = false;
				}

				switch (passType) {
					case PassengerType.Adult:
						if (
							currentPassConfig.count <= passengersConfig.INF.count ||
							currentPassConfig.count <= passengersConfig.INS.count ||
							currentPassConfig.count <= 1
						) {
							canDecrease = false;
						}
						break;

					case PassengerType.InfantWithSeat:
					case PassengerType.Child:
						if (passengersConfig.ADT.count <= 0) {
							canIncrease = false;
						}
						break;

					case PassengerType.Infant:
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

export const webskyPassengers = createSelector(
	[ getPassengersArray ],
	(passengers: PassengerState[]) => {
		return passengers
			.filter(passenger => passenger.count)
			.map((passenger: PassengerState) => {
				return { ...passenger, code: WebskyPassengerType[passenger.code] };
			});
	}
);
