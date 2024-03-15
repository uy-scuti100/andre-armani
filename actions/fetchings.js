"use server";

const fs = require("fs");

export const fetchProducts = async () => {
	try {
		const jsonData = fs.readFileSync("constants/data/products.json", "utf8");
		const data = JSON.parse(jsonData);

		return data.products;
	} catch (error) {
		// Throw the error to indicate failure
		throw new Error("Error reading data: " + error.message);
	}
};
export const fetchSingleProduct = async (slug) => {
	try {
		// Decode the name parameter
		const decodedName = decodeURIComponent(slug);

		const jsonData = fs.readFileSync("constants/data/products.json", "utf8");
		const data = JSON.parse(jsonData);

		// Find the product with the matching name
		const product = data.products?.find((item) => {
			const itemName = decodeURIComponent(item.slug);
			return itemName === decodedName;
		});

		if (!product) {
			throw new Error(`Product with slug '${decodedName}' not found`);
		}
		return product;
	} catch (error) {
		// Throw the error to indicate failure
		throw new Error("Error reading data: " + error.message);
	}
};

// export const fetchRelatedProducts = async (type) => {
// 	try {
// 		const jsonData = fs.readFileSync("constants/data/products.json", "utf8");
// 		const data = JSON.parse(jsonData);

// 		return data.products;
// 	} catch (error) {
// 		// Throw the error to indicate failure
// 		throw new Error("Error reading data: " + error.message);
// 	}
// };
