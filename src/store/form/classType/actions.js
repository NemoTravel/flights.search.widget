import { SET_CLASS_TYPE } from 'store/actions';

export function setClassType (classType) {
	return {
		type: SET_CLASS_TYPE,
		classType
	}
}