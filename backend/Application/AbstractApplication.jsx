import {bound} from "../../common/Utils/decorators";
import {serverConfig} from "../../config/config";
import Database from "../Database";

export default class AbstractApplication {
	static Create() {
		return new this;
	}

	static Run() {
		return this.Create().run();
	}

	router;
	express;

	/** @type Database */
	database;

	async init() {
		this.database = new Database(this);
		await this.database.connect();
	}

	async run() {
		throw new Error('Method `Application.run` is abstract and should be overriden');
	}

	exit() {
		process.exit(1);
	}

	@bound onServerStart() {
		console.log(`Server started at port ${serverConfig.port}`);
	}
}