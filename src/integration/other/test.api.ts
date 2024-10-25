const fetch_category = async () => {
	try {
		const result = await fetch(`${process.env.SHOE_STORE_DOMAIN}/api/v1/category`);
		return result.json();
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const OtherAPI = {
	fetch_category
};
