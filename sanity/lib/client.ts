// ./src/utils/sanity/client.ts
import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
});

const imageBuilder = createImageUrlBuilder({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

export const urlForImage = (source: Image) => {
	// Ensure that source image contains a valid reference
	if (!source?.asset?._ref) {
		return undefined;
	}

	return imageBuilder?.image(source).auto("format").fit("max").url();
};

// export const urlFor = (source) => {
// 	return imageBuilder?.image(source).auto("format").fit("max");
// };
