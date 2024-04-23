"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScroll({ children }) {
	return (
		<ReactLenis
			root
			options={{
				duration: 1.2,
				smoothWheel: true,
				syncTouch: true,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			}}
		>
			{children}
		</ReactLenis>
	);
}
export default SmoothScroll;
