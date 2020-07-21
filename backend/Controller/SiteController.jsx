import FileSystem from "fs";
import Path from "path";
import AbstractController from "./AbstractController";
import Promise from "bluebird";
import {endpoint} from "../../common/Utils/functions";

const {readFileAsync} = Promise.promisifyAll(FileSystem);

export default class SiteController extends AbstractController {
	static BaseUrl = '/';

	layoutHtml = null;

	get layoutFile() {
		return Path.resolve('layouts/index.html');
	}

	@endpoint('/')
	async indexEndpoint() {
		if(!this.layoutHtml) {
			this.layoutHtml = await readFileAsync(this.layoutFile);
		}

		return this.layoutHtml;
	}
}