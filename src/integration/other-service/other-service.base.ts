import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { GetRequestParams, Method, PostRequestParams, PutRequestParams, DeleteRequestParams } from "src/types/http_client.type";
import { IAxiosInstanceShoeStore, IConfigAxiosInstance, ShoeStoreAPIResponse } from "src/types/api.type";
import { SHOE_STORE_API_PATHS } from "./other-service.constant";
import { getAPIPath } from "../api-path";
import { handleErrorResponse } from "./other-service.helper";

//#region private action
const axios_shoe_store = axios.create({});

// interceptor for http
axios_shoe_store.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return Promise.reject(axiosError);
		}
		return Promise.reject(error || "Wrong Services");
	}
);

function setConfig(config: IConfigAxiosInstance) {
	if (config.params) axios_shoe_store.defaults.params = config.params;
	if (config.timeout) axios_shoe_store.defaults.timeout = config.timeout;
	if (config.baseURL) axios_shoe_store.defaults.baseURL = config.baseURL;
}

//#endregion

//#region public action
async function callGetRequest<T>(args: GetRequestParams): Promise<ShoeStoreAPIResponse<T>> {
	const access_token = axios_shoe_store.defaults.params["access_token"];
	const shop_id = axios_shoe_store.defaults.params["shop_id"];
	try {
		const _path: string = getAPIPath(SHOE_STORE_API_PATHS, {
			http_method: Method.Get,
			operation: args.operation,
			urlIds: args.urlIds
		});
		const option: AxiosRequestConfig = {
			url: _path + (args.customQuery ? `?${args.customQuery}` : ""),
			method: Method.Get,
			headers: args.extraHeaders,
			// params: args.query ? generateSign2({ ...args.query, access_token, shop_id }, _path) : null,
			timeout: args.timeout
		};

		const response = await axios_shoe_store.request(option);
		return response.data as ShoeStoreAPIResponse<T>;
	} catch (err: any) {
		return handleErrorResponse(err);
	}
}

async function callPostRequest<T>(args: PostRequestParams): Promise<ShoeStoreAPIResponse<T>> {
	const access_token = axios_shoe_store.defaults.params["access_token"];
	const shop_id = axios_shoe_store.defaults.params["shop_id"];
	try {
		const _path: string = getAPIPath(SHOE_STORE_API_PATHS, {
			http_method: Method.Post,
			operation: args.operation,
			urlIds: args.urlIds
		});
		const option: AxiosRequestConfig = {
			url: _path + (args.customQuery ? `?${args.customQuery}` : ""),
			method: Method.Post,
			headers: args.extraHeaders,
			// params: args.query ? generateSign2({ ...args.query, access_token, shop_id }, _path) : null,
			data: args.data,
			timeout: args.timeout
		};

		const response = await axios_shoe_store.request(option);
		return response.data as ShoeStoreAPIResponse<T>;
	} catch (err: any) {
		return handleErrorResponse(err);
	}
}

async function callPutRequest<T>(args: PutRequestParams): Promise<T> {
	const access_token = axios_shoe_store.defaults.params["access_token"];
	const shop_id = axios_shoe_store.defaults.params["shop_id"];
	try {
		const _path: string = getAPIPath(SHOE_STORE_API_PATHS, {
			http_method: Method.Put,
			operation: args.operation,
			urlIds: args.urlIds
		});
		const option: AxiosRequestConfig = {
			url: _path + (args.customQuery ? `?${args.customQuery}` : ""),
			method: Method.Put,
			headers: args.extraHeaders,
			// params: args.query ? generateSign2({ ...args.query, access_token, shop_id }, _path) : null,
			data: args.data,
			timeout: args.timeout
		};
		const response = await axios_shoe_store.request(option);
		return response.data;
	} catch (err: any) {
		return handleErrorResponse(err);
	}
}

async function callDeleteRequest<T>(args: DeleteRequestParams): Promise<T> {
	const access_token = axios_shoe_store.defaults.params["access_token"];
	const shop_id = axios_shoe_store.defaults.params["shop_id"];
	try {
		const _path: string = getAPIPath(SHOE_STORE_API_PATHS, {
			http_method: Method.Delete,
			operation: args.operation,
			urlIds: args.urlIds
		});
		const option: AxiosRequestConfig = {
			url: _path + (args.customQuery ? `?${args.customQuery}` : ""),
			method: Method.Delete,
			headers: args.extraHeaders,
			// params: args.query ? generateSign2({ ...args.query, access_token, shop_id }, _path) : null,
			timeout: args.timeout
		};
		const response = await axios_shoe_store.request(option);
		return response.data;
	} catch (err: any) {
		return handleErrorResponse(err);
	}
}
//#endregion

export const AXIOS_SHOE_STORE: IAxiosInstanceShoeStore = {
	GET: callGetRequest,
	POST: callPostRequest,
	PUT: callPutRequest,
	DELETE: callDeleteRequest,
	set: setConfig
};
