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
			delay: 6.5,
			clipPath: "circle(50% at 50% 50%)",
		});
	});

	useEffect(() => {
		setTimeout(() => {
			router.push("/home");
		}, 6500);
	}, []);

	return (
		<section>
			<div className="absolute inset-0 z-40 flex items-center justify-center bg-background ">
				<PreloaderSvg />
			</div>
			<div
				className="absolute inset-0 z-50 bg-background overlay"
				style={{ clipPath: "circle(0.0% at 50% 50%)" }}
			></div>
		</section>
	);
}
