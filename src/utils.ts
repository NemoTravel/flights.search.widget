import * as moment from 'moment';
import * as Cache from './cache';
import { Moment } from 'moment';

export const clearURL = (url: string): string => url.trim().replace(/^\/|\/$/g, '');

interface AnyObject {
	[paramName: string]: any
}

export const encodeURLParams = (params: AnyObject = {}): string => {
	const numOfParams = Object.keys(params).length;
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
export const URL = (root: string, params: AnyObject = {}): string => {
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
export const i18n = (moduleName: string, label: string): string => {
	try {
		const locale = Cache.getLocale();
		const module = require(`i18n/${locale}/${moduleName}`);

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
export const getIntermediateDates = (firstDate: Moment, secondDate: Moment = moment(), withBoundaryDates: boolean = false): Moment[] => {
	const result: Moment[] = [];

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

export const isIE = (): boolean => {
	return navigator.appName === 'Microsoft Internet Explorer' ||
		!!(navigator.userAgent.match(/Trident/) ||
			navigator.userAgent.match(/rv:11/));
};

const getAltLayoutCache: AnyObject = {};

export const getAltLayout = (string: string): string => {
	if (getAltLayoutCache[string]) {
		return getAltLayoutCache[string];
	}

	const eng = ' `qwertyuiop[]asdfghjkl;\'zxcvbnm,./~QWERTYUIOP{}ASDFGHJKLZXCVBNM<>?'.split('');
	const rus = ' ёйцукенгшщзхъфывапролджэячсмитьбю.ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЯЧСМИТЬБЮ,'.split('');
	const map: AnyObject = {};
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
