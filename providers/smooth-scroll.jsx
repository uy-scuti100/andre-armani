"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScroll({ children }) {
	return (
		<ReactLenis
			root
			options={{ lerp: 0.01, smoothWheel: true, syncTouch: true }}
		>
			{children}
		</ReactLenis>
	);
}
export default SmoothScroll;
