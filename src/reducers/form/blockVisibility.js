import { types } from 'actions';

const initialState = {
	search: true,
	registration: true,
	bookings: true
};

export default function blockVisibilityReducer(state = initialState, action) {
	switch (action.type) {
		case types.TOGGLE_BLOCK:
			return { ...state, [action.payload]: !state[action.payload] };
	}
	
	return state;
}