"use client";
import { useGSAP } from "@gsap/react";
import PreloaderSvg from "../components/global-components/proloader";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
	const router = useRouter();
	useGSAP(() => {
		gsap.to(".overlay", {
			duration: 1.5,
			delay: 5,
			clipPath: "circle(50% at 50% 50%)",
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			router.push("/home");
		}, 5500);
	}, []);

	return (
		<section>
			<div className="absolute inset-0 z-40 flex items-center justify-center w-screen h-screen overflow-hidden bg-background home-home">
				<PreloaderSvg />
			</div>
			<div
				className="absolute inset-0 z-50 w-full h-full overflow-hidden bg-background overlay"
				style={{ clipPath: "circle(0.0% at 50% 50%)" }}
			></div>
		</section>
	);
}
