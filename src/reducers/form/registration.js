import { types } from 'actions';

const initialState = {
	isActive: false
};

export default function registrationReducer(state = initialState, action) {
	switch (action.type) {
		case types.TOGGLE_BLOCK:
			// Sorry. Move it to the separate action.
			if (action.payload === 'registration') {
				return {...state, isActive: !state.isActive};
			}
			break;
	}
	
	return state;
}