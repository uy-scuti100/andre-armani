import Image from "next/image";
import React from "react";

export default function Featureproduct() {
	return (
		<section className="flex flex-col items-center justify-center w-full h-screen mt-32 md:flex-row">
			<div className="flex-1 w-full h-full md:order-2">
				<Image
					src={"/wears/coming-soon.webp"}
					width={400}
					height={400}
					alt="coming-soon"
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="flex flex-col items-center justify-center flex-1 w-full h-full gap-10 md:order- bg-muted">
				<h1 className="text-[3.75rem] font-semibold text-center">
					COMING SOON
				</h1>
				<h3 className="font-thin opacity-50">Summer 2025</h3>
			</div>
		</section>
	);
}
