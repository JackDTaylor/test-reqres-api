import FileSystem from "fs";
import Path from "path";
import AbstractController from "./AbstractController";
import Promise from "bluebird";
import {endpoint} from "../../common/Utils/functions";

const {readFileAsync} = Promise.promisifyAll(FileSystem);

export default class SiteController extends AbstractController {
	static BaseUrl = '/';

	get layoutFile() {
		return Path.resolve('layouts/index.html');
	}

	@endpoint()
	async indexEndpoint() {
		return readFileAsync(this.layoutFile);
	}
}