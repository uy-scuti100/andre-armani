"use client";

import Imagecomponent from "./image-component";
import ImageSwitchcomponent from "./image-switch-component";
import LinkComponent from "./link-component";
import { useState } from "react";
import MailIcon from "../../../components/global-components/mail-icon";
import ShareIcon from "../../../components/global-components/share-icon";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import SkeletonProductInfo from "./product-skeleton";
import RelatedProductsInfo from "./related-products-info";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "../../../store/cart";
import { toast } from "../../../components/ui/use-toast";
import AddToCartButton from "./addtocart-button-component";
import BuyItNowButton from "./buyitnow-button-component";

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
	if (isError) {
		return <div>error</div>;
	}
	if (isFetching || isLoading) {
		return <SkeletonProductInfo />;
	}

	if (data && data.length == 0) {
		return <div>No data found</div>;
	}

	const searchParams = useSearchParams();
	const [slider, setSlider] = useState(0);
	const selectedSize = searchParams.get("size") ?? data?.sizes?.[0];
	const descriptions = data?.description?.split(".");
	const router = useRouter();

	const calculatePrice = () => {
		if (!selectedSize) return data?.price; // Default to base price if no size selected

		const sizeIndex = data.sizes.indexOf(selectedSize);
		const priceIncrease = 50 * sizeIndex; // Price increase based on size index
		const amount = (parseFloat(data?.price) + priceIncrease).toFixed(2);
		return amount;
	};

	const addItem = useStore((state) => state.addToCart);
	const cart = useStore((state) => state.cart);

	const handleAddToCart = (data) => {
		// Check if data and data.slug are defined
		if (data && data.slug && data.slug.current) {
			const existingItem = cart.find(
				(item) =>
					item._id === data.slug.current && item.selectedSize === selectedSize
			);

			if (existingItem) {
				toast({
					variant: "destructive",
					title: "Already in cart",
					description:
						"You have already added this item to cart. Increase quantity from cart.",
				});
			} else {
				addItem({
					_id: data.slug.current,
					name: data.name,
					image: data.images[0],
					price: data.price,
					type: data.type,

					selectedSize,
				});

				toast({
					title: `Added to cart!`,
					description:
						"You can check your cart by clicking the cart icon on the top right corner of the screen.",
				});
			}
		} else {
			console.error("Invalid data or data.slug is undefined");
		}
	};
	// const addToCart = (data) => {
	// 	addItem({
	// 		_id: data.slug.current,
	// 		name: data.name,
	// 		image: data.images[0],
	// 		price: data.price,
	// 		selectedSize,
	// 	});
	// 	const existingItem = cart.find(
	// 		(item) =>
	// 			item._id === data.slug.current && item.selectedSize === selectedSize
	// 	);
	// 	if (existingItem) {
	// 		toast({
	// 			title: `Added to cart!`,
	// 			description:
	// 				"You can check your cart by clicking the cart icon on the top right corner of the screen.",
	// 		});
	// 	} else {
	// 		toast({
	// 			variant: "destructive",
	// 			title: "Already in cart",
	// 			description: "You should check your cart.",
	// 		});
	// 	}
	// };

	return (
		<section>
			<figure className="flex flex-col justify-center gap-10 px-[0.63rem] lg:flex-row">
				<div className="relative items-center justify-center sm:w-[80%] sm:mx-auto w-full flex h-[70vh] md:h-[80vh] lg:order-2 lg:basis-[60%]">
					{data.images && (
						<Imagecomponent
							src={data.images[slider]}
							alt={`${data.name}'s image-${slider + 1}`}
							base64={data.base64}
						/>
					)}
				</div>
				<div className="md:my-0 lg:order-1 lg:basis-[10%]">
					<div className="flex items-center justify-center gap-5 lg:flex-col">
						{data.images.map((image, i) => {
							return (
								<button onClick={() => setSlider(i)} key={i}>
									<ImageSwitchcomponent
										src={image}
										alt={`${data.name}'s image-${i + 1}`}
										base64={data.base64}
										className={`w-[80px] p-1 h-[80px] object-cover cursor-pointer ${
											i === slider && "border-2 border-primary rounded"
										}`}
									/>
								</button>
							);
						})}
					</div>
				</div>

				<figcaption className="my-3 md:my-0 lg:order-3 lg:basis-[30%]">
					<h4 className="pb-6 text-xl font-medium uppercase">"{data.name}"</h4>

					<div className="pb-6 text-sm font-light ">
						{data && (
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
							<div key={i} className="rounded-none">
								{data.type === "printed_hoodies" ? (
									<LinkComponent
										href={size}
										className={
											selectedSize === size
												? "bg-black text-white"
												: "bg-[#C7C7C7]"
										}
									>
										{size}
									</LinkComponent>
								) : (
									<LinkComponent
										href={size}
										className={
											selectedSize === size
												? "bg-black text-white"
												: "bg-[#C7C7C7]"
										}
									>
										"{size}"
									</LinkComponent>
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
						<AddToCartButton
							onClick={() => handleAddToCart(data)}
							children={"add to cart"}
						/>

						<BuyItNowButton
							onClick={() => {
								router.push("/checkout");
							}}
							children={"Proceed to checkout"}
						/>
					</div>
				</figcaption>
			</figure>
			<div className="px-[0.63rem] mt-20 ">
				<pre className="pb-8 text-sm font-light ">
					Features of <span className="font-me">{data.name}</span>:
				</pre>
				<menu className="flex flex-col gap-6">
					{descriptions?.slice(0, -1).map((desc, i) => (
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

// href={`${new URLSearchParams({
//     size: selectedSize
// })}`}
// searchParams.get("size") || data?.sizes?.[0] || "";
// const [selectedSize, setSelectedSize] = useState(data?.sizes?.[0]);
// addItem({
// 	id: data._id,
// 	name: data.name,
// 	image: data.images[0],
// 	price: data.price,
// 	selectedSize,
// })
