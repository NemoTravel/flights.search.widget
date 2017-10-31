import { SET_CLASS_TYPE } from 'store/actions';
import { classType } from 'state';

export default function(state = classType, action = {}) {
	if (action.classType) {
		return action.classType;
	}

	return state;
}

