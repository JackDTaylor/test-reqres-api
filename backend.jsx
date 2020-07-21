import Application from "./backend/Application";
import EmergencyServer from "./backend/Utility/EmergencyServer";
import {dpr} from "./common/dpr";

(async() => {
	try {
		global.dpr = dpr;

		const exitHandler = (...args) => Application.Instance.exit(...args);

		process.on('exit',    exitHandler);
		process.on('SIGINT',  exitHandler);
		process.on('SIGUSR1', exitHandler);
		process.on('SIGUSR2', exitHandler);

		process.on('uncaughtException', EmergencyServer.Run);

		await Application.Instance.run();
	} catch(e) {
		EmergencyServer.Run(e);
	}
})();
