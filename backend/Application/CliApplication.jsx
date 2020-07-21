import AbstractApplication from "./AbstractApplication";
import ImportUsersCommand from "../Commands/ImportUsersCommand";

export default class CliApplication extends AbstractApplication {
	get commands() {
		return {
			"import-users": ImportUsersCommand,
		};
	}

	async run() {
		await this.init();

		const [,,commandName, ...commandParams] = process.argv;
		const Command = this.commands[ commandName ] || null;

		if(!Command) {
			throw new Error(`Command '${commandName}' not found`);
		}

		const command = new Command(this);

		await command.execute(...commandParams);
	}
}