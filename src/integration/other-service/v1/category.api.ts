import { DataType } from "src/types";
import { AXIOS_SHOE_STORE } from "../other-service.base";
import { OPERATION_SHOE_STORE } from "../other-service.constant";

async function get_category_list() {
	try {
		const category_list = await AXIOS_SHOE_STORE.GET({
			operation: OPERATION_SHOE_STORE.LIST_CATEGORY,
			query: {},
			data: {},
			extraHeaders: {},
			urlIds: {},
			timeout: 20000,
			tries: 3,
			type: DataType.JSON
		});
		console.log("test", category_list);
		return category_list;
	} catch (error) {
		throw error;
	}
}

export const CategoryAPI = {
	get_category_list
};
