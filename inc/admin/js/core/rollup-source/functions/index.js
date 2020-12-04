/**
 * General functions that can be used through out app.
 */

/**
 * Get a property value from an object with a string key.
 
 * @param {string} stringKey key
 * @param {Object} target target object
 * @return {*} property value
 */
// eslint-disable-next-line import/prefer-default-export
export const objectPropertyFromString = (stringKey, target) => {
	// split string key for inner properties
	let splitKey = stringKey.split('.');

	if (!Array.isArray(splitKey)) {
		splitKey = [splitKey];
	}

	return splitKey.reduce((carry, item) => {
		return carry[item];
	}, target);
};

/**
 * Set object property from string.
 *
 * @param {string} stringKey key
 * @param {Object} target target object
 * @param {*} value value
 */
export const setObjectPropertyFromString = (stringKey, target, value) => {
	let splitKey = stringKey.split('.');

	if (!Array.isArray(splitKey)) {
		splitKey = [splitKey];
	}

	if (splitKey.length === 1) {
		// eslint-disable-next-line no-param-reassign
		target[splitKey[0]] = value;
	} else {
		const parents = splitKey.slice(0, splitKey.length - 1);

		const parent = parents.reduce((carry, item) => {
			return carry[item];
		}, target);

		parent[splitKey[splitKey.length - 1]] = value;
	}
};

/**
 * Get element id from a table element's class.
 *
 * @param {HTMLElement} tableElement table element
 * @return {null|string} null if no id is found
 */
export const parseTableElementId = (tableElement) => {
	if (tableElement) {
		const activeElementIdArray = tableElement
			.getAttribute('class')
			.split(' ')
			.filter((c) => {
				const regExp = new RegExp(/^wptb-element-(.+)-(\d+)$/, 'g');
				return regExp.test(c);
			})[0];

		if (activeElementIdArray) {
			return activeElementIdArray.replace('wptb-element-', '');
		}
	}
	return null;
};
/**
 * Find table element type from its class.
 *
 * @param {HTMLElement} tableElement table element
 * @return {null|string} null if no type is found
 */
export const parseElementType = (tableElement) => {
	if (tableElement) {
		const activeElementKindArray = tableElement
			.getAttribute('class')
			.split(' ')
			.filter((c) => {
				const regExp = new RegExp(/^wptb-element-(.+)-(\d+)$/, 'g');
				return regExp.test(c);
			})[0];

		if (activeElementKindArray) {
			const regExp = new RegExp(/^wptb-element-(.+)-(\d+)$/, 'g');
			const [, elementType] = regExp.exec(activeElementKindArray);
			return elementType;
		}
	}
	return null;
};

/**
 * Get a parent of an element in a specific node type.
 *
 * @param {HTMLElement} element element
 * @param {string} type node type
 */
export const getParentOfType = (element, type) => {
	function recursiveParent(el) {
		const parent = el.parentNode;
		if (parent.nodeName === type.toUpperCase()) {
			return parent;
		}
		return recursiveParent(parent);
	}

	return recursiveParent(element);
};

/**
 * Generate an unique id.
 *
 * @param {number} id length
 * @param length
 * @return {string} generated id
 */
export const generateUniqueId = (length = 5) => {
	const variables = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5'];
	let key = '';

	for (let i = 0; i < length; i += 1) {
		key += variables[Math.floor(Math.random() * variables.length)];
	}

	return key;
};

/**
 * Compare equality of objects on value level.
 *
 * @param {Object} source source object
 * @param {Object} target target object
 * @return {boolean} equal or not
 */
export const isObjectValuesSame = (source, target) => {
	return Object.keys(source).every((k) => {
		return source[k] === target[k];
	});
};
