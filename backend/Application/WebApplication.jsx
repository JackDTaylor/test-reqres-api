import express from "express";
import AbstractApplication from "./AbstractApplication";
import Router from "../Router";
import SiteController from "../Controller/SiteController";
import ApiController from "../Controller/ApiController";
import {serverConfig} from "../../config/config";

export default class WebApplication extends AbstractApplication {
	async run() {
		await this.init();

		this.router = new Router(this);
		this.express = express();

		this.express.use('/', express.static('public'));
		this.express.use('/compiled/frontend.js', express.static('compiled/frontend.js'));

		this.router.registerController(SiteController);
		this.router.registerController(ApiController);

		this.express.listen(serverConfig.port, this.onServerStart);
	}
}