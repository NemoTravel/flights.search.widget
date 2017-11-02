import Promise from 'promise-polyfill';

(() => {
	if (!Object.assign) {
		Object.defineProperty(Object, 'assign', {
			enumerable: false,
			configurable: true,
			writable: true,
			value: function(target) {
				'use strict';
				if (target === undefined || target === null) {
					throw new TypeError('Cannot convert first argument to object');
				}

				const to = Object(target);

				for (let i = 1; i < arguments.length; i++) {
					const nextSource = arguments[i];

					if (nextSource === undefined || nextSource === null) {
						continue;
					}

					const keysArray = Object.keys(Object(nextSource));

					for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
						const nextKey = keysArray[nextIndex];
						const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

						if (desc !== undefined && desc.enumerable) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
				return to;
			}
		});
	}

	// To add to window
	if (!window.Promise) {
		window.Promise = Promise;
	}
})();
