class BaseService {
	constructor() { }

	sendResponse(data: any, message?: any, status?: any): any {
		if (message) {
			const { type } = data;
			const statusCode = status ? status : 500;
			return { status: statusCode, data: null, error: type, messge: message };
		} else {
			return { status: 200, data: data.data, message: 'Request Successfull' };
		}
	}

	commonErrorResponse(error: any): any {
		const errorMessage = error.message
			? error.message
			: 'Unknown Error Occured In Register Api';

		const statusCode = error.status ? error.status : 500;
		return this.sendResponse(error, errorMessage, statusCode);
	}
}

export default BaseService;
