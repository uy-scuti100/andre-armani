"use client";
import React from "react";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

export default function page() {
	const router = useRouter();
	return (
		<section className="flex flex-col items-center justify-center h-screen">
			<h2 className="text-lg text-center uppercase tracking-[6px]">
				the store is not receiving orders at the moment
			</h2>

			<p className="pt-[4rem] capitalize">please check back soon</p>

			<Button
				onClick={() => router.push("/home")}
				size="lg"
				className="mt-[2rem]"
			>
				Go back Home
			</Button>
		</section>
	);
}
