import { Action } from 'redux';
import { ENABLE_CACHING } from '../actions';

export const enableCaching = (): Action => {
	return {
		type: ENABLE_CACHING
	};
};
