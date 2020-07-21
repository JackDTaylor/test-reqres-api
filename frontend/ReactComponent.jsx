import React from "react";

export default class ReactComponent extends React.Component {
	get cls() {
		// Convert CamelCase class name into kebab-case CSS class
		return this.constructor.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
	}

	subCls(subClass, ...modifiers) {
		const className = `${this.cls}__${subClass}`;

		modifiers = modifiers
			.filter(modifier => Object.values(modifier)[0])
			.map(modifier => `${className}--${Object.keys(modifier)[0]}`);

		return [`${this.cls}__${subClass}`, ...modifiers].join(' ');
	}
}