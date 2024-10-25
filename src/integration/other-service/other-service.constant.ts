import { Method, ResourcePath } from "src/types";

export enum OPERATION_SHOE_STORE {
	LIST_CATEGORY = "get_category"
}

const CATEGORY_PATHS: ResourcePath[] = [
	{
		http_method: Method.Get,
		operation: OPERATION_SHOE_STORE.LIST_CATEGORY,
		ids: [],
		path: "/api/v1/category"
	}
];

export const SHOE_STORE_API_PATHS: ResourcePath[] = [...CATEGORY_PATHS];
