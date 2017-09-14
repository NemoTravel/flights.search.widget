import { SHOW_ERRORS } from 'actions';

const initialState = false;

export default function showErrors(state = initialState, { type, payload }) {
	switch (type) {
		case SHOW_ERRORS:
			return payload;
	}
	
	return state;
}