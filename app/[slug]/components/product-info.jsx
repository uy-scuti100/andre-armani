"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import MailIcon from "../../../components/global-components/mail-icon";
import ShareIcon from "../../../components/global-components/share-icon";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import SkeletonProductInfo from "../../../components/global-components/product-skeleton";
import RelatedProductsInfo from "./related-products-info";

export default function ProductInfo({ slug, children }) {
	const {
		data: productData,
		isError,
		isFetching,
		isLoading,
	} = useQuery({
		queryKey: ["art-work", slug],
		queryFn: () => fetchSingleArtwork(slug),
		staleTime: 1000 * 60 * 5,
		refetchInterval: 1000 * 60 * 180,
	});

	const data = productData?.[0];
	const [slider, setSlider] = useState(0);
	const [selectedSize, setSelectedSize] = useState(data?.sizes?.[0]);
	const descriptions = data?.description?.split(".");

	// Calculate price based on selected size index
	const calculatePrice = () => {
		if (!selectedSize) return data?.price; // Default to base price if no size selected

		const sizeIndex = data.sizes.indexOf(selectedSize);
		const priceIncrease = 50 * sizeIndex; // Price increase based on size index
		const amount = (parseFloat(data?.price) + priceIncrease).toFixed(2);
		return amount;
	};

	if (isError) {
		return <div>error</div>;
	}
	if (isFetching || isLoading) {
		return <SkeletonProductInfo />;
	}

	if (data && data.length == 0) {
		return <div>No data found</div>;
	}

	return (
		<section>
			<figure className="flex flex-col justify-center gap-10 px-[0.63rem] lg:flex-row">
				<div className="relative items-center justify-center sm:w-[80%] sm:mx-auto w-full flex h-[70vh] md:h-[80vh] lg:order-2 lg:basis-[60%]">
					{data.images && (
						<Image
							src={data.images[slider]}
							alt={`${data.name}'s image-${slider + 1}`}
							height={500}
							width={300}
							className="object-cover w-full h-full"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							placeholder="blur"
							blurDataURL={data.base64}
						/>
					)}
				</div>
				<div className="md:my-0 lg:order-1 lg:basis-[10%]">
					<div className="flex items-center justify-center gap-5 lg:flex-col">
						{data.images.map((image, i) => {
							return (
								<div onClick={() => setSlider(i)} key={i}>
									<Image
										src={image}
										height={100}
										width={100}
										className={`w-[80px] p-1 h-[80px] object-cover cursor-pointer ${
											i === slider && "border-2 border-primary rounded"
										}`}
										alt={`${data.name}'s image`}
										placeholder="blur"
										blurDataURL={data.base64}
									/>
								</div>
							);
						})}
					</div>
				</div>

				<figcaption className="my-3 md:my-0 lg:order-3 lg:basis-[30%]">
					<h4 className="pb-6 text-xl font-medium uppercase">"{data.name}"</h4>

					<div className="pb-6 text-sm font-light ">
						{data && (
							// ... other code
							<p className="pb-8 text-sm font-light "> ${calculatePrice()}</p>
						)}
					</div>
					<p className="pb-6 text-xs font-light ">
						{data.type === "printed_hoodies" ? (
							<span>
								In sizes:{" "}
								<span className="text-[10px]">
									(small, medium, large and extralarge)
								</span>{" "}
							</span>
						) : (
							<span className="">
								{" "}
								Sizes:{" "}
								<span>
									<sup>(inch)</sup>
								</span>
							</span>
						)}
					</p>
					<div className="flex flex-wrap items-center gap-6 pb-8 text-sm font-light ">
						{data.sizes.map((size, i) => (
							<div
								key={i}
								onClick={() => setSelectedSize(size)}
								className="rounded-none"
							>
								{data.type === "printed_hoodies" ? (
									<Button
										href={"#"}
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
										href={"#"}
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

					{selectedSize && data.type === "printed_hoodies" ? (
						<span className="mt-4 text-xs font-light">
							Selected Size: {selectedSize} at ${calculatePrice()}
						</span>
					) : (
						<span className="mt-4 text-xs font-light">
							Selected Size: {selectedSize} inches at ${calculatePrice()}
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
					Features of <span className="font-me">{data.name}</span>:
				</pre>
				<menu className="flex flex-col gap-6">
					{descriptions.slice(0, -1).map((desc, i) => (
						<li className="list-disc" key={i}>
							{desc}.
						</li>
					))}
				</menu>
			</div>

			<section>
				{children && (
					<RelatedProductsInfo type={data.type} slug={data.slug.current} />
				)}{" "}
			</section>
		</section>
	);
}
