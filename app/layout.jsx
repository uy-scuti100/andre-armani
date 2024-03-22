import "../styles/globals.css";

// export const revalidate = 1000 * 60 * 60 * 24 * 7;
// export const revalidateOnFocus = false;
// export const revalidateOnReconnect = true;
// export const dynamic = "force-dynamic";

import { GeistMono } from "geist/font/mono";
import Header from "../components/global-components/header";
import Footer from "../components/global-components/footer";
import SmoothScroll from "../providers/smooth-scroll";
import ReactQueryProvider from "../components/global-components/query-provider";
import { Toaster } from "../components/ui/toaster";

export const metadata = {
	title: "ANDRE ARMANI",
	description:
		"website to cop all and latest artistic products of ANDRE ARMANI",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={` ${GeistMono.variable} antialiased`}>
			<body>
				<ReactQueryProvider>
					{/* <SmoothScroll> */}
					<Header />
					{children}
					<Toaster />
					<Footer />
					{/* </SmoothScroll> */}
				</ReactQueryProvider>
			</body>
		</html>
	);
}
