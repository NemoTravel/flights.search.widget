import moment from 'moment';
import * as Cache from 'cache';

export const clearURL = url => url.trim().replace(/^\/|\/$/g, '');

export const encodeURLParams = (params = {}) => {
	const numOfParams = typeof params === 'object' ? Object.keys(params).length : 0;
	let result = '',
		i = 1;

	if (numOfParams) {
		for (const paramName in params) {
			if (params.hasOwnProperty(paramName)) {
				result += `${paramName}=${params[paramName]}`;

				if (i !== numOfParams) {
					result += '&';
				}

				i++;
			}
		}
	}

	return result;
};

/**
 * Create URL string with params.
 *
 * @param {String} root
 * @param {Object} params
 * @returns {String}
 */
export const URL = (root, params = {}) => {
	let result = clearURL(root);
	const encodedParams = encodeURLParams(params);

	if (encodedParams) {
		result += '?' + encodedParams;
	}

	return result;
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
		let locale = Cache.get(Cache.KEY_LOCALE);

		locale = locale ? locale : 'en';
		const module = require('i18n/' + locale + '/' + moduleName);

		return module[label];
	}
	catch (e) {
		console.warn(e);
		return '';
	}
};

/**
 * Get an array of MomentJS dates between two given dates.
 *
 * @param firstDate
 * @param secondDate
 * @param withBoundaryDates
 * @returns {Array}
 */
export const getIntermediateDates = (firstDate, secondDate = moment(), withBoundaryDates = false) => {
	const result = [];

	if (firstDate && secondDate) {
		const startDate = firstDate.clone();
		const endDate = secondDate.clone();

		while (startDate.add(1, 'days').diff(endDate) < 0) {
			result.push(startDate.clone());
		}

		if (withBoundaryDates) {
			result.unshift(firstDate);
			result.push(secondDate);
		}
	}

	return result;
};

export const isIE = () => {
	return navigator.appName === 'Microsoft Internet Explorer' ||
		!!(navigator.userAgent.match(/Trident/) ||
			navigator.userAgent.match(/rv:11/));
};

const getAltLayoutCache = {};

export const getAltLayout = string => {
	if (getAltLayoutCache[string]) {
		return getAltLayoutCache[string];
	}

	const eng = ' `qwertyuiop[]asdfghjkl;\'zxcvbnm,./~QWERTYUIOP{}ASDFGHJKLZXCVBNM<>?'.split('');
	const rus = ' ёйцукенгшщзхъфывапролджэячсмитьбю.ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЯЧСМИТЬБЮ,'.split('');
	const map = {};
	let result = '';

	if (/[a-zA-Z]+/.test(string)) {
		eng.map((engChar, index) => {
			map[engChar] = rus[index];
		});
	}
	else {
		rus.map((rusChar, index) => {
			map[rusChar] = eng[index];
		});
	}

	for (let i = 0, max = string.length; i < max; i++) {
		result += map[string[i]];
	}

	if (result) {
		getAltLayoutCache[string] = result;
	}

	return result;
};
