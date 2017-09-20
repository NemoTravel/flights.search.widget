import { TOGGLE_BLOCK } from 'actions';
import { blockVisibilityState } from 'state';

export default function blockVisibilityReducer(state = blockVisibilityState, action) {
	switch (action.type) {
		case TOGGLE_BLOCK:
			return { ...state, [action.payload]: !state[action.payload] };
	}
	
	return state;
}