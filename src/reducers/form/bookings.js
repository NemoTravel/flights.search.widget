import { types } from 'actions';

const initialState = {
	isActive: false
};

export default function bookingsReducer(state = initialState, action) {
	switch (action.type) {
		case types.TOGGLE_BLOCK:
			// Sorry. Move it to the separate action.
			if (action.payload === 'bookings') {
				return {...state, isActive: !state.isActive};
			}
			break;
	}
	
	return state;
}