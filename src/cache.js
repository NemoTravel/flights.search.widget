import Cookie from 'js-cookie';

export const KEY_LOCALE = 'locale';

export const unserialize = string => {
	try {
		return JSON.parse(string);
	}
	catch (e) {
		return string;
	}
};

export const serialize = object => typeof object === 'string' ? object : JSON.stringify(object);

export const get = key => typeof localStorage !== 'undefined' ?
	unserialize(localStorage.getItem(key)) :
	unserialize(Cookie.get(key));

export const set = (key, value) => typeof localStorage !== 'undefined' ?
	localStorage.setItem(key, serialize(value)) :
	Cookie.set(key, serialize(value));

export const getLocale = () => {
	const locale = get(KEY_LOCALE);

	return locale ? locale : 'en';
};
