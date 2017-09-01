import { cloneDeep } from 'lodash';

export const defaultState = {
	blockIsActive: {
		tickets: true,
		registration: false,
		bookings: false
	}
};

export function verticalFormReducer(state = defaultState, action) {
	let newState = cloneDeep(state);
	
	switch (action.type) {
		case 'TOGGLE_BLOCK':
			newState.blockIsActive[action.blockName] = !newState.blockIsActive[action.blockName];
			break;
	}
	
	return newState;
}