import * as crypto from "crypto";
import { AxiosError } from "axios";
// import { ShopeeContext } from "src/context";

//optimize
export function generateSign2(params: Record<string, unknown>, pathname: string): Record<string, unknown> {
	const partner_id = process.env.PARTNER_ID;
	const partner_key: string = process.env.PARTNER_KEY ?? "";
	const timestamp = Math.ceil(new Date().getTime() / 1000);

	let allParams: Record<string, any> = { partner_id, pathname, timestamp, ...params };
	let keyRoots = ["partner_id", "pathname", "timestamp", "access_token", "shop_id"];
	let stringHash: string = "";
	for (let i = 0; i < keyRoots.length; i++) {
		let _key: string = keyRoots[i];
		if (allParams[_key]) stringHash += allParams[_key];
	}

	const sign = crypto.createHmac("sha256", partner_key).update(stringHash).digest("hex");
	allParams["sign"] = sign;

	return allParams;
}

export function handleErrorResponse<T>(error: any) {
	try {
		const axiosError = error as AxiosError;
		if (!axiosError.response) throw axiosError;
		if (axiosError.status === 429) {
			throw new Error("Too Many Requests");
		}
		if (axiosError.status === 400) {
			throw new Error("Bad Request");
		}
		if (axiosError.status === 401) {
			throw new Error("Unauthorized");
		}
		if (axiosError.status === 403) {
			throw new Error("Forbidden");
		}
		if (axiosError.status === 404) {
			throw new Error("Not Found");
		}
		if (axiosError.status === 500) {
			throw new Error("Internal Server Error");
		}
		if (axiosError.status === 408) {
			throw new Error("Request Timeout");
		}

		return axiosError;
	} catch (e: any) {
		return e;
	}
}
