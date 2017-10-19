import Cookie from 'js-cookie';

export const KEY_LOCALE = 'locale';
export const KEY_AUTOCOMPLETE = 'autocomplete';

export const unserialize = (string) => {
	try {
		return JSON.parse(string);
	}
	catch (e) {
		return string;
	}
};

export const serialize = (object) => {
	return typeof object === 'string' ? object : JSON.stringify(object);
};

export const get = key => typeof localStorage !== 'undefined'
	? unserialize(localStorage.getItem(key))
	: unserialize(Cookie.get(key));

export const set = (key, value) => typeof localStorage !== 'undefined'
	? localStorage.setItem(key, serialize(value))
	: Cookie.set(key, serialize(value));