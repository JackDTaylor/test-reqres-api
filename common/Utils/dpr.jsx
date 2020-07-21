import Util from 'util';
import {valueType} from "./functions";

global._dpr = function _dpr(values, separator = "\n\n", colors = false) {
	let stack;

	try {
		// noinspection ExceptionCaughtLocallyJS
		throw new Error;
	} catch(error) {
		stack = error.stack.split('\n')[3];
		stack = stack.replace(/^.*\((.*)\).*$/, '$1');
	}

	const header = `
##############################################################################
#
#    Debug print at
#      ${stack}
#
##############################################################################
	`.trim() + '\n\n';

	return header + values.map((value, index) => {
		let title = `####### Index ${index} #`.padEnd(78, '#') + '\n';

		if(typeof value === "undefined") {
			return title + "undefined";
		}

		if([Number, String].indexOf(valueType(value)) >= 0) {
			return title + value;
		}

		return title + Util.inspect(value, {depth: 5, colors});
	}).join(separator);
};

export const dpr = function(...values) {
	const error = new Error;
	error.stack = _dpr(values);

	throw error;
};