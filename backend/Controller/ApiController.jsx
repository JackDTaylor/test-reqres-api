import AbstractController from "./AbstractController";
import User from "../../models/User";

export default class ApiController extends AbstractController {
	async userSearchEndpoint() {
		const User = getModel(User);

		const a = await getModel(User).Query()
			.where('id', 1)
			.first();

		dpr(a);
	}
}