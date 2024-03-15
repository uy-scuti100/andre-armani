import Image from "next/image";
import Link from "next/link";
import React from "react";

const collections = [
	{
		label: "Framed Canvas",
		image: "/framed-canvas/canvas-eleven-v1.webp",
		href: "/collection/framed-canvas",
	},
	{
		label: "Paper Prints",
		image: "/paper-prints/paper-six-v1.webp",
		href: "/collection/paper-prints",
	},
	{
		label: "Printed Wears",
		image: "/wears/wear-five-v3.webp",
		href: "/collection/wears",
	},
];
export default function page() {
	return (
		<section className="pt-[6.438rem]">
			<h2 className="text-lg text-center uppercase tracking-[6px]">
				collections
			</h2>

			<div className="mt-[100px] px-[0.685rem]">
				<div className="flex flex-wrap items-center justify-center gap-8">
					{collections.map((collection, i) => {
						const { href, image, label } = collection;

						return (
							<Link href={href} className="my-5 " key={i}>
								<div className="md:w-[300px] w-full h-[300px] relative">
									<Image
										src={image}
										width={500}
										height={500}
										alt={`${label}'s banner`}
										className="md:w-[300px] h-[300px] object-cover"
									/>
								</div>
								<h3 className="text-center uppercase tracking-[3px] mt-10">
									{label}
								</h3>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
