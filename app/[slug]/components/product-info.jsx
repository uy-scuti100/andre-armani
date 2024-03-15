"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import MailIcon from "../../../components/global-components/mail-icon";
import ShareIcon from "../../../components/global-components/share-icon";
import Link from "next/link";

export default function ProductInfo({ info }) {
	const [slider, setSlider] = useState(0);
	const [selectedSize, setSelectedSize] = useState(info.sizes[0]);
	const descriptions = info.description.split(".");

	// Calculate price based on selected size index
	const calculatePrice = () => {
		if (!selectedSize) return info.price; // Default to base price if no size selected

		const sizeIndex = info.sizes.indexOf(selectedSize);
		const priceIncrease = 50 * sizeIndex; // Price increase based on size index

		return parseFloat(info.price) + priceIncrease;
	};
	return (
		<section>
			<figure className="flex flex-col justify-center gap-10 px-[0.63rem] lg:flex-row">
				<div className="relative items-center justify-center sm:w-[80%] sm:mx-auto w-full flex h-[70vh] md:h-[80vh] lg:order-2 lg:basis-[60%]">
					{info.images && (
						<Image
							src={info.images[slider]}
							alt={`${info.name}'s image-${slider + 1}`}
							height={500}
							width={300}
							className="object-cover w-full h-full"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					)}
				</div>
				<div className="md:my-0 lg:order-1 lg:basis-[10%]">
					<div className="flex items-center justify-center gap-5 lg:flex-col">
						{info.images.map((image, i) => {
							return (
								<button onClick={() => setSlider(i)} key={i}>
									<Image
										src={image}
										height={100}
										width={100}
										className="w-[50px] h-[50px] object-cover cursor-pointer"
										alt={`${info.name}'s image`}
									/>
								</button>
							);
						})}
					</div>
				</div>

				<figcaption className="my-3 md:my-0 lg:order-3 lg:basis-[30%]">
					<div className="pb-6 text-xl font-medium uppercase">
						"{info.name}"
					</div>

					<div className="pb-8 text-sm font-light ">
						{" "}
						${calculatePrice().toFixed(2)}
					</div>
					<div className="pb-6 text-xs font-light ">
						{info.type === "printed_hoodies" ? (
							<div>sizes:</div>
						) : (
							<span className="">
								{" "}
								Sizes:{" "}
								<span>
									<sup>(inches)</sup>
								</span>
							</span>
						)}
					</div>
					<div className="flex flex-wrap items-center gap-6 pb-8 text-sm font-light ">
						{info.sizes.map((size, i) => (
							<div key={i} onClick={() => setSelectedSize(size)}>
								{info.type === "printed_hoodies" ? (
									<Button
										className={`rounded-none hover:text-white text-black font-light text-xs ${
											selectedSize === size
												? "bg-black text-white"
												: "bg-[#C7C7C7]"
										}`}
									>
										{size}
									</Button>
								) : (
									<Button
										className={`rounded-none hover:text-white text-black font-light text-xs ${
											selectedSize === size
												? "bg-black text-white"
												: "bg-[#C7C7C7]"
										}`}
									>
										"{size}"
									</Button>
								)}
							</div>
						))}
					</div>

					{selectedSize && (
						<span className="mt-4 text-xs font-light">
							Selected Size: {selectedSize}
						</span>
					)}
					<div className="flex flex-col gap-5 mt-12">
						<Link
							href={"mailto:hexeldigitalstudio@gmail.com"}
							className="flex items-center gap-5"
						>
							<MailIcon />
							<span className="text-xs">Email us about this product.</span>
						</Link>
						<button className="flex items-center gap-5">
							<ShareIcon />

							<span className="text-xs">Share this </span>
						</button>
					</div>

					<div className="my-12">
						<Button className="bg-[rgb(83,83,83)] hover:bg-[rgb(83,83,83)]  font-light w-full rounded-none py-6 text-base text-white uppercase mb-8 shadow-none hover:scale-105 transition-transform duration-300 ease-in-out ">
							Add To cart
						</Button>
						<Button className="w-full py-6 text-base font-light uppercase transition-transform duration-300 ease-in-out rounded-none shadow-none bg-foreground/10 hover:bg-foreground/10 text-foreground hover:scale-105">
							buy it now
						</Button>
					</div>
				</figcaption>
			</figure>
			<div className="px-[0.63rem] mt-20 ">
				<pre className="pb-8 text-sm font-light ">
					Features of <span className="font-me">{info.name}</span>:
				</pre>
				<menu className="flex flex-col gap-6">
					{descriptions.slice(0, -1)?.map((desc) => (
						<li className="list-disc" key={i}>
							{desc}.
						</li>
					))}
				</menu>
			</div>
		</section>
	);
}
