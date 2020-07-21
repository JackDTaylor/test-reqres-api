import Component from "./Component";

export default class Router extends Component {
	route(Controller, endpointName) {
		return async(request, response) => {
			try {
				const controller = new Controller(this.application, request, response);

				return await controller.handleEndpoint(endpointName);
			} catch(error) {
				response.set({'Content-Type': 'text/plain'});
				response.send(error.stack);
			}
		}
	}

	registerController(Controller) {
		for(const route of Controller.Routes || []) {
			const method = String(route.httpMethod || 'get').toLowerCase();

			const url = `${Controller.BaseUrl}${route.url}`;
			const routeFn = this.route(Controller, route.endpoint);

			this.application.express[method].apply(this.application.express, [url, routeFn]);
		}
	}
}