import { Request, Response } from "express";

import { ShoeStoreAPI } from "src/integration/shoe-store";
import { response } from "src/common/mock-api/order";

const handle_category_list = async (req: Request, res: Response) => {
	const storeAPI = new ShoeStoreAPI();
	const result = await storeAPI.category.get_category_list();

	res.json(result);
};
// n^2 * log(n) + 2n
const report_top_coupon = (req: Request, res: Response) => {
	const order_list = response.data.results;
	const coupon_map: any = new Map<string, number>();

	// business logic
	for (const order of order_list) {
		if (order.pricing.coupons.length === 0) continue;

		const coupons = order.pricing.coupons;
		for (const coupon of coupons) {
			if (coupon_map.has(coupon.code)) {
				coupon_map.set(coupon.code, coupon_map.get(coupon.code) + 1);
			} else coupon_map.set(coupon.code, 1);
		}
	}

	// sort the map by value
	const coupon_sorted = Array.from(coupon_map).sort((a: any, b: any) => b[1] - a[1]);

	// Transform the sorted array into the desired format
	const coupon_report = coupon_sorted.map(([coupon_code, usage_count]: any) => ({
		coupon_code,
		usage_count
	}));

	res.json(coupon_report);
};

// n + n*log(n) + 2n
const report_top_coupon_optimized = (req: Request, res: Response) => {
	const order_list = response.data.results;
	const coupon_map: any = new Map<string, number>();

	let list_coupons: any[] = [];

	// get list coupon
	for (const order of order_list) {
		list_coupons = list_coupons.concat(order.pricing.coupons);
	}

	// handle business logic
	for (const coupon of list_coupons) {
		if (coupon_map.has(coupon.code)) {
			coupon_map.set(coupon.code, coupon_map.get(coupon.code) + 1);
		} else coupon_map.set(coupon.code, 1);
	}

	// sort the map by value
	const coupon_sorted = Array.from(coupon_map).sort((a: any, b: any) => b[1] - a[1]);

	// Transform the sorted array into the desired format
	const coupon_report = coupon_sorted.map(([coupon_code, usage_count]: any) => ({
		coupon_code,
		usage_count
	}));

	res.json(coupon_report);
};

// n * log(n) + 2n
const report_sales_taxes = (req: Request, res: Response) => {
	const order_list = response.data.results;
	const seller_map: any = new Map<string, number>();

	// business logic
	for (const order of order_list) {
		const seller_name: string = order.pricing.seller.store_name;
		const seller_tax: number = order.pricing.sales_tax;

		if (seller_map.has(seller_name)) {
			seller_map.set(seller_name, seller_map.get(seller_name) + seller_tax);
		} else seller_map.set(seller_name, seller_tax);
	}

	// sort the map by value
	const seller_tax_sorted = Array.from(seller_map).sort((a: any, b: any) => a[0].localeCompare(b[0]));

	// Transform the sorted array into the desired format
	const tax_report = seller_tax_sorted.map(([seller_name, total_sales_tax]: any) => ({
		seller_name,
		total_sales_tax
	}));

	res.json(tax_report);
};

// n * log(n) + 2n
const report_shipping_states = (req: Request, res: Response) => {
	const order_list = response.data.results;
	const shipping_map: any = new Map<string, number>();

	// business logic
	for (const order of order_list) {
		const order_state: string = order.shipping_address.state;

		if (shipping_map.has(order_state)) {
			shipping_map.set(order_state, shipping_map.get(order_state) + 1);
		} else shipping_map.set(order_state, 0);
	}

	// sort the map by value
	const shipping_state_sorted = Array.from(shipping_map).sort((a: any, b: any) => b[1] - a[1]);

	// Transform the sorted array into the desired format
	const shipping_state_report = shipping_state_sorted.map(([state, number_of_orders]: any) => ({
		state,
		number_of_orders
	}));

	res.json(shipping_state_report);
};

export const OtherController = {
	handle_category_list,
	report_top_coupon,
	report_sales_taxes,
	report_shipping_states,

	report_top_coupon_optimized
};
