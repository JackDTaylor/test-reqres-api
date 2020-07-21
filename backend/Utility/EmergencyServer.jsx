import fs from "fs";
import express from "express";
import {serverConfig} from "../../config/config";

export default class EmergencyServer {
	static Run(error) {
		fs.writeFileSync('exception.log', "Exception: " + error.stack);

		// Launch emergency server
		express().all('*', function(req, res) {
			res.set({'Content-Type': 'text/plain'});
			res.send('[EMERGENCY MODE]\n' + error.stack);
		}).listen(serverConfig.port);
	}
}