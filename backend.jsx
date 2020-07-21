import WebApplication from "./backend/Application/WebApplication";
import EmergencyServer from "./backend/Utility/EmergencyServer";
import {dpr} from "./common/Utils/dpr";

(async() => {
	try {
		global.dpr = dpr;

		const application = WebApplication.Create();

		const exitHandler = (...args) => application.exit(...args);

		process.on('exit',    exitHandler);
		process.on('SIGINT',  exitHandler);
		process.on('SIGUSR1', exitHandler);
		process.on('SIGUSR2', exitHandler);

		process.on('uncaughtException', EmergencyServer.Run);

		await application.run();
	} catch(error) {
		EmergencyServer.Run(error);
	}
})();
