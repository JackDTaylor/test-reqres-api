import AbstractCommand from "./AbstractCommand";
import fetch from "node-fetch";

export default class ImportUsersCommand extends AbstractCommand {
	existingExternalIds;

	async fetchPage(page = 1) {
		const response = await fetch(`https://reqres.in/api/users?page=${page}`);

		return await response.json();
	}

	async importRecord({id: external_id, email, first_name, last_name}) {
		// Possibly would be better with `ON DUPLICATE KEY UPDATE` but knex does not support it.
		if(this.existingExternalIds.indexOf(external_id) >= 0) {
			return this.db.table('user').update({
				email,
				first_name,
				last_name,
			}).where('external_id', external_id);
		}

		return this.db.table('user').insert({
			email,
			first_name,
			last_name,
			external_id,
		});
	}

	async importPage(page = 1, attemptsLeft = 3) {
		const users = await this.fetchPage(page);

		if(!users || !users.data) {
			if(attemptsLeft > 0) {
				return this.importPage(page, attemptsLeft - 1);
			}

			throw new Error('Unable to fetch users');
		}

		for(const record of users.data || []) {
			await this.importRecord(record);
		}

		if(page >= users['total_pages']) {
			return true;
		}

		return await this.importPage(page + 1);
	}

	async fetchExistingExternalIds() {
		const rows = await this.db.table('user').select('external_id');

		return rows.map(x => x.external_id);
	}

	async execute() {
		this.existingExternalIds = await this.fetchExistingExternalIds();

		await this.importPage(1);
	}
}