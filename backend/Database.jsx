import {databaseConfig} from "../config/config";
import Component from "./Component";

export default class Database extends Component {
	knex;

	async connect() {
		this.knex = require('knex')(databaseConfig);
	}

	table(tableName) {
		return this.knex.table(tableName);
	}
}