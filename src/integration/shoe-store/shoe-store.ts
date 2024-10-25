import { AXIOS_SHOE_STORE } from "./shoe-store.base";
import { CategoryAPI } from "./v1/category.api";

export class ShoeStoreAPI {
	public readonly category: typeof CategoryAPI;

	constructor() {
		this.setAxiosInstance();
		this.category = { ...CategoryAPI };
	}

	private setAxiosInstance() {
		AXIOS_SHOE_STORE.set({
			params: {},
			baseURL: process.env.SHOE_STORE_DOMAIN,
			timeout: 20000
		});
	}
}
