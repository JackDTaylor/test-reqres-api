export default class Component {
	application;

	constructor(application) {
		this.application = application;
	}

	get db() {
		return this.application.database;
	}
}