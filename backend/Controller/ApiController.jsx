import AbstractController from "./AbstractController";
import {endpoint} from "../../common/Utils/functions";
import ImportUsersCommand from "../Commands/ImportUsersCommand";

export default class ApiController extends AbstractController {
	static BaseUrl = '/api';

	@endpoint('/user/search')
	async userSearchEndpoint() {
		const searchTerms = String(this.request.query.searchTerm || '')
			.replace(/\s+/g, ' ')
			.trim()
			.split(' ');

		const query = this.db.table('user');

		for(let term of searchTerms) {
			term = `%${term.replace('%', '\\%')}%`;

			query.orWhere('first_name', 'like', term);
			query.orWhere('last_name', 'like', term);
		}

		return query;
	}

	@endpoint('/user/test-import')
	async testUserImportEndpoint() {
		const command = new ImportUsersCommand(this.application);
		await command.execute();

		return true;
	}
}