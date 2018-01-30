import { ApplicationState, ServiceClass } from '../../../state';

export const getClassType = (state: ApplicationState): ServiceClass => {
	return state.form.additional.classType;
};

export const vicinityDatesSelect = (state: ApplicationState): boolean => {
	return !!state.form.additional.vicinityDates;
};

export const directFlightSelect = (state: ApplicationState): boolean => {
	return state.form.additional.directFlight;
};
