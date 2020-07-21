/**
 * Returns value type
 * @param value
 * @param objectConstructors
 * @return {*}
 */
import HttpMethod from "../References/HttpMethod";

export const valueType = function valueType(value, objectConstructors = false) {
	if(typeof(value) === 'string' || value instanceof String) {
		return String;
	}

	if(typeof(value) === 'number' || value instanceof Number) {
		return Number;
	}

	if(typeof(value) === 'boolean' || value instanceof Boolean) {
		return Boolean;
	}

	if(typeof(value) === 'object' && value instanceof Array) {
		return Array;
	}

	if(typeof(value) === 'function' && value instanceof Function) {
		return Function;
	}

	if(value && typeof(value) === 'object' && value instanceof Object) {
		if(objectConstructors && value.constructor && value instanceof value.constructor) {
			return value.constructor;
		}

		return Object;
	}

	if(value) {
		console.warn('Unknown value')
	}

	return null;
};

/**
 * Returns whether object is direct instance of Object
 * @param value
 * @return {*|boolean}
 */
export const isPlainObject = function isPlainObject(value) {
	return value && value instanceof Object && value.constructor === Object;
};

export const isUndefined = function isUndefined(value) {
	return typeof(value) === 'undefined';
};

/**
 * Returns wheither value is undefined or null
 * @param value
 * @return {boolean}
 */
export const undefinedOrNull = function undefinedOrNull(value) {
	return isUndefined(value) || value === null;
};

/**
 * Returns whether value is not undefined or null
 * @param value
 * @return {boolean}
 */
export const notUndefinedOrNull = function notUndefinedOrNull(value) {
	return !undefinedOrNull(value);
};

/**
 * @param value
 * @return {*}
 */
export const empty = function empty(value) {
	return undefinedOrNull(value)
		|| (valueType(value) === Array && value.length < 1)
		|| (valueType(value) === Object && value.constructor === Object && Object.keys(value).length < 1)
		|| (value === "") ;
};

export const cmp = function(a, b) {
	if(a === b) {
		return 0;
	}

	return a > b ? 1 : -1;
};

export const endpoint = function(url = '/', httpMethod = HttpMethod.GET) {
	return (prototype, endpoint) => {
		endpoint = endpoint.replace(/Endpoint$/, '');

		prototype.constructor.Routes = prototype.constructor.Routes || [];
		prototype.constructor.Routes.push({httpMethod, url, endpoint});
	};
};