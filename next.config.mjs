/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";

const withPWAConfig = nextPWA({
	// Create a named config object
	dest: "public",
});

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
		],
	},
};

export default withPWAConfig(nextConfig); // Apply withPWAConfig and export
