import {dpr} from "./common/Utils/dpr";
import CliApplication from "./backend/Application/CliApplication";

(async() => {
	try {
		global.dpr = dpr;

		await CliApplication.Run();
	} catch(error) {
		console.log(error.stack);
	}
})();