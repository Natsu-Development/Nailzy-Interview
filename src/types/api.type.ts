import { GetRequestParams, PutRequestParams, PostRequestParams, DeleteRequestParams } from "./http_client.type";

export interface IConfigAxiosInstance {
	timeout?: number;
	headers?: any;
	baseURL?: string;
	params?: any;
	basicAuth?: {
		username: string;
		password: string;
	};
}

export interface ShoeStoreAPIResponse<T> {
	message: string;
	warning: string;
	request_id: string;
	response: T;
	error: string;
}

export interface IAxiosInstance {
	GET: <T>(args: GetRequestParams) => Promise<T>;
	POST: <T>(args: PostRequestParams) => Promise<T>;
	PUT: <T>(args: PutRequestParams) => Promise<T>;
	DELETE: <T>(args: DeleteRequestParams) => Promise<T>;
	set: (config: IConfigAxiosInstance) => void;
}

export interface IAxiosInstanceShoeStore {
	GET: <T>(args: GetRequestParams) => Promise<ShoeStoreAPIResponse<T>>;
	POST: <T>(args: PostRequestParams) => Promise<ShoeStoreAPIResponse<T>>;
	PUT: <T>(args: PutRequestParams) => Promise<ShoeStoreAPIResponse<T>>;
	DELETE: <T>(args: DeleteRequestParams) => Promise<ShoeStoreAPIResponse<T>>;
	set: (config: IConfigAxiosInstance) => void;
}

export interface ResourcePath {
	http_method: string;
	operation: string;
	ids: string[];
	path: string;
}

export interface IdSet {
	[id: string]: string | number | null;
}

export interface ParamSet {
	[key: string]: any;
}

export interface GetPathArgs<T = null> {
	http_method: string;
	operation: string;
	urlIds: IdSet;
	entity?: T;
}

export interface CommonAPIField {
	org_id: number;
	user_id: string;
}
