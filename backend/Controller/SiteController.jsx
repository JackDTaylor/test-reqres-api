import FileSystem from "fs";
import Path from "path";
import AbstractController from "./AbstractController";
import Promise from "bluebird";

const {readFileAsync} = Promise.promisifyAll(FileSystem);

export default class SiteController extends AbstractController {
	get layoutFile() {
		return Path.resolve('layouts/index.html');
	}

	async indexEndpoint() {
		return readFileAsync(this.layoutFile);
	}
}