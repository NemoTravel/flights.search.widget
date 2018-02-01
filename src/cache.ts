import * as Cookie from 'js-cookie';
import { Language } from './state';

export const KEY_LOCALE = 'locale';

export const unserialize = (string: string): Object | string => {
	try {
		return JSON.parse(string);
	}
	catch (e) {
		return string;
	}
};

export const serialize = (object: Object | string): string => typeof object === 'string' ? object : JSON.stringify(object);

export const get = (key: string): Object | string => {
	return typeof localStorage !== 'undefined' ? unserialize(localStorage.getItem(key)) : unserialize(Cookie.get(key));
};

export const set = (key: string, value: Object | string): void => {
	typeof localStorage !== 'undefined' ? localStorage.setItem(key, serialize(value)) : Cookie.set(key, serialize(value));
};

export const getLocale = (): Language => {
	const locale = get(KEY_LOCALE);

	return locale ? locale as Language : Language.English;
};
