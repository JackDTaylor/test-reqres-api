export default class Router {
	route(Controller, endpointName) {
		return async(request, response) => {
			try {
				const controller = new Controller(request, response);

				return await controller.handleEndpoint(endpointName);
			} catch(error) {
				response.set({'Content-Type': 'text/plain'});
				response.send(error.stack);
			}
		}
	}
}