// import { Method } from "./http_client.enum";
import { IdSet } from "./api.type";

export enum Method {
	Get = "GET",
	Post = "POST",
	Put = "PUT",
	Patch = "PATCH",
	Delete = "DELETE",
	Options = "OPTIONS"
}

export interface HeaderParams {
	[key: string]: string | number;
}

export enum DataType {
	JSON = "application/json",
	URLEncoded = "application/x-www-form-urlencoded"
}

export type QueryParams = string | number | string[] | number[] | { [key: string]: QueryParams };

export interface GetRequestParams {
	urlIds: IdSet;
	operation: string;
	type?: DataType;
	data?: { [key: string]: unknown } | string;
	query?: { [key: string]: QueryParams };
	extraHeaders?: HeaderParams;
	tries?: number;
	timeout?: number;
	customQuery?: string;
}

export type PostRequestParams = GetRequestParams & {
	type: DataType;
	data: FormData | { [key: string]: unknown } | string;
};

export type PutRequestParams = PostRequestParams;

export type DeleteRequestParams = GetRequestParams;

export type RequestParams = (GetRequestParams | PostRequestParams) & {
	method: Method;
};
