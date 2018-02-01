import * as Cookie from 'js-cookie';
import { Language } from './state';

export const KEY_LOCALE = 'locale';

export const unserialize = (string: string): any => {
	try {
		return JSON.parse(string);
	}
	catch (e) {
		return string;
	}
};

export const serialize = (object: any): string => typeof object === 'string' ? object : JSON.stringify(object);

export const get = (key: string): any => typeof localStorage !== 'undefined' ?
	unserialize(localStorage.getItem(key)) :
	unserialize(Cookie.get(key));

export const set = (key: string, value: any): void => typeof localStorage !== 'undefined' ?
	localStorage.setItem(key, serialize(value)) :
	Cookie.set(key, serialize(value));

export const getLocale = (): Language => {
	const locale = get(KEY_LOCALE);

	return locale ? locale as Language : Language.English;
};
