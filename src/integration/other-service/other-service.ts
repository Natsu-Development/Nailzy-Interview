import { AXIOS_SHOE_STORE } from "./other-service.base";
import { CategoryAPI } from "./v1/category.api";

export class OtherServiceAPI {
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
