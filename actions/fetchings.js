"use server";

import { client } from "../sanity/lib/client";
import getBase64 from "../lib/getbase64";
import { groq } from "next-sanity";

export const fetchAllArtwork = async () => {
	try {
		const products = await client.fetch(
			groq`*[_type == "products"]{ 
                _id,
                name,
                slug,
                price, 
                soldOut, 
                sizes,
                type,
                description,
                "images": images[].asset->url,
        
             }`
		);

		// Fetch base64 data for each image
		const productsWithBase64 = await Promise.all(
			products.map(async (product) => {
				const base64 = await getBase64(product.images[0]);
				return { ...product, base64 };
			})
		);

		return productsWithBase64;
	} catch (error) {
		console.error("Error fetching products:", error);
	}
};

// fetch a single product
export const fetchSingleArtwork = async (slug) => {
	try {
		const product = await client.fetch(
			groq`*[_type == "products" && slug.current == "${slug}"]{ 
                _id,
                name,
                slug,
                price, 
                soldOut, 
                sizes,
                type,
                description,
                "images": images[].asset->url,
             
        
             }`
		);

		// Fetch base64 data for each image
		const productsWithBase64 = await Promise.all(
			product?.map(async (product) => {
				const base64 = await getBase64(product?.images[0]);
				return { ...product, base64 };
			})
		);

		return productsWithBase64;
	} catch (error) {
		console.error("Error fetching product:", error);
	}
};

export const fetchRelatedProducts = async (slug, type) => {
	try {
		const relatedProducts = await client.fetch(
			groq`*[_type == "products" && type == "${type}" && slug.current != "${slug}"] {
          name,
          slug,
          price,
          "images": images[].asset->url
        }[0...9]` // Limit to 2 results (excluding the passed slug)
		);

		// Fetch base64 data for each image
		const relatedProductsWithBase64 = await Promise.all(
			relatedProducts.map(async (product) => {
				const base64 = await getBase64(product.images[0]);
				return { ...product, base64 };
			})
		);

		return relatedProductsWithBase64;
	} catch (error) {
		console.error("Error fetching related products:", error);
	}
};

export const fetchAllArtworkByType = async (type) => {
	try {
		const products = await client.fetch(
			groq`*[_type == "products" && type == "${type}"]{
                _id,
                name,
                slug,
                price,
                soldOut,
                sizes,
                type,
                description,
                "images": images[].asset->url,
             }`
		);

		// Fetch base64 data for each image
		const productsWithBase64 = await Promise.all(
			products.map(async (product) => {
				const base64 = await getBase64(product.images[0]);
				return { ...product, base64 };
			})
		);
		return productsWithBase64;
	} catch (error) {
		console.error("Error fetching products by type:", error);
	}
};

export const fetchSearchProducts = async (query) => {
	try {
		const products = await client.fetch(
			groq`*[_type == "products"  && (name match "*${query}*" || slug match "*${query}*" || description match "*${query}*")]{

                name,
                slug,
                price,
                "images": images[].asset->url,
                _score,
                _type == "product" => {
                    name match "${query}*" => 5,
                    slug match "${query}*" => 3,
                    description match "${query}*" => 2
                }
            }`
		);

		// Fetch base64 data for each image
		const productsWithBase64 = await Promise.all(
			products.map(async (product) => {
				const base64 = await getBase64(product.images[0]);
				return { ...product, base64 };
			})
		);
		return productsWithBase64;
	} catch (error) {
		console.error("Error fetching search results:", error);
		return [];
	}
};
