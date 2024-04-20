import "../styles/globals.css";

import { GeistMono } from "geist/font/mono";
import Header from "../components/global-components/header";
import Footer from "../components/global-components/footer";
import SmoothScroll from "../providers/smooth-scroll";
import ReactQueryProvider from "../components/global-components/query-provider";
import { Toaster } from "../components/ui/toaster";

const icons = [
	{ rel: "icon", url: "/favicon-32x32.png" },
	{ rel: "icon", url: "/favicon-16x16.png" },
	{ rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
];

const manifest = "/manifest.json";
export const metadata = {
	title: "Andre Armani",
	description:
		"website to cop all and latest artistic products of ANDRE ARMANI",
	openGraph: {
		type: "website",
		url: "https://andre-armani.vercel.app/",
		title: "Andre Armani",
		description:
			"website to cop all and latest artistic products of ANDRE ARMANI",
		siteName: "Andre Armani",
		images: [
			{
				url: "https://shorturl.at/aistT",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@hussain_joe",
		creator: "@hussain_joe",
		title: "Andre Armani",
		description:
			"website to cop all and latest artistic products of ANDRE ARMANI",
		images: "https://shorturl.at/aistT",
	},
	robots: "index, follow",
	icons: icons,
	manifest: manifest,
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={` ${GeistMono.variable} antialiased`}>
			<body>
				<ReactQueryProvider>
					<SmoothScroll>
						<Header />
						{children}
						<Toaster />
						<Footer />
					</SmoothScroll>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
