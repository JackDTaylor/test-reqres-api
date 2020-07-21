import AbstractController from "./AbstractController";
import {endpoint} from "../../common/Utils/functions";
import ImportUsersCommand from "../Commands/ImportUsersCommand";

export default class ApiController extends AbstractController {
	static BaseUrl = '/api';

	@endpoint('/user/search')
	async userSearchEndpoint() {
		return [];
	}

	@endpoint('/user/test-import')
	async testUserImportEndpoint() {
		const command = new ImportUsersCommand(this.application);
		await command.execute();

		return true;
	}
}