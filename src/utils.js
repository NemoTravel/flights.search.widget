import Cookie from 'js-cookie';

/**
 * Caching function.
 * 
 * Uses `localStorage` if available, or uses cookies instead.
 * 
 * @param key
 * @param value
 */
export const cache = (key, value = null) => {
	if (typeof localStorage !== 'undefined') {
		if (value) {
			localStorage.setItem(key, value);
		}
		else {
			return localStorage.getItem(key);
		}
	}
	else {
		if (value) {
			Cookie.set(key, value);
		}
		else {
			return Cookie.get(key);
		}
	}
};

/**
 * Internationalization module.
 * 
 * @param moduleName
 * @param label
 * @returns {*}
 */
export const i18n = (moduleName, label) => {
	try {
		const locale = cache('locale');
		const module = require('i18n/' + locale + '/' + moduleName);
		
		return module[label];
	}
	catch (e) {
		console.warn(e);
		return '';
	}
};