import express from "express";
import {bound} from "../common/decorators";
import ApiController from "./Controller/ApiController";
import Router from "./Router";
import SiteController from "./Controller/SiteController";
import {serverConfig} from "../config/config";

export default class Application {
	/**
	 * @type {Application}
	 * @private
	 */
	static instance = null;
	static get Instance() {
		if(!this.instance) {
			this.instance = new this;
		}

		return this.instance;
	}

	express;
	router;

	run() {
		this.router = new Router;
		this.express = express();

		this.express.get('/', this.router.route(SiteController, 'index'));
		this.express.get('/api/users/search', this.router.route(ApiController, 'usersSearch'));

		this.express.listen(serverConfig.port, this.onServerStart);
	}

	exit() {
		process.exit(1);
	}

	@bound onServerStart() {
		console.log(`Server started at port ${serverConfig.port}`);
	}
}