import {valueType} from "../../common/Utils/functions";
import Component from "../Component";

export default class AbstractController extends Component {
	resuest;
	response;

	get errorMessages() {
		return {
			404: 'Not found',
		};
	}

	set contentType(value) {
		this.response.set({'Content-Type': value});
	}

	constructor(application, request, response) {
		super(application);

		this.request = request;
		this.response = response;

		this.contentType = 'text/html; charset=utf-8';
	}

	async handleEndpoint(endpointName) {
		const method = `${endpointName}Endpoint`;

		if(method in this === false) {
			return this.handleError(404);
		}

		const result = await this[method].apply(this);

		return this.sendResponse(result);
	}

	async handleError(errorCode) {
		this.sendResponse({
			success: false,
			message: this.errorMessages[errorCode] || `Unknown error #${errorCode}`
		});
	}

	sendResponse(response) {
		if(response instanceof Buffer) {
			response = response.toString();
		}

		if(valueType(response) === Array) {
			response = { items: response, success: true };
		}

		if(valueType(response) === Boolean) {
			response = { success: response };
		}

		if(valueType(response) === Object) {
			this.contentType = 'application/json';
		}

		this.response.send(response);
	}
}