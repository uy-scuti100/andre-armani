"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useStore } from "../../store/cart";
import Image from "next/image";
import BuyItNowButton from "../[slug]/components/buyitnow-button-component";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
	const [totalProductsCount, setTotalProductsCount] = useState(0);
	const cart = useStore((state) => state.cart);
	const removeFromCart = useStore((state) => state.removeFromCart);
	const increaseQuantity = useStore((state) => state.increaseQuantity);
	const decreaseQuantity = useStore((state) => state.decreaseQuantity);
	const remove = useStore((state) => state.removeAll);
	const router = useRouter();

	useEffect(() => {
		let totalCount = 0;
		cart.forEach((item) => {
			totalCount += item.quantity;
		});
		setTotalProductsCount(totalCount);
	}, [cart]);

	return (
		<section className="pt-[6.438rem]">
			<menu className="flex flex-col px-5 space-y-6 min-h-svh">
				{totalProductsCount > 0 && (
					<h2 className="text-lg text-center uppercase tracking-[6px] pb-10">
						your cart items
					</h2>
				)}
				{cart.length > 0 ? (
					cart.map((item) => {
						const { _id, name, image, price, quantity, selectedSize } = item;
						const newPrice = (parseFloat(price) * quantity).toFixed(2);
						return (
							<>
								<li key={_id} className="flex justify-start space-x-2">
									<div className="flex items-center justify-center w-full gap-10">
										<div>
											<Image
												src={image}
												width={128}
												height={128}
												alt={name}
												className="object-cover w-32 h-32"
											/>
										</div>
										<div className="flex justify-between w-full">
											<div className="flex flex-col items-start gap-2">
												<Link href={`/${_id}`} className="font-bold">
													{name}
												</Link>
												<h3 className="text-sm">${newPrice}</h3>
												<p className="text-sm">Size: {selectedSize}</p>
												<p className="text-sm">Qty: {quantity}</p>
											</div>
											<div className="flex flex-col space-y-4">
												<Button
													size={"sm"}
													variant={"outline"}
													onClick={() => increaseQuantity(_id, selectedSize)}
												>
													+
												</Button>
												<Button
													size={"sm"}
													variant={"outline"}
													onClick={() => decreaseQuantity(_id, selectedSize)}
													disabled={quantity === 1}
												>
													-
												</Button>
												<button
													className="text-xs underline text-destructive"
													onClick={() => removeFromCart(_id, selectedSize)}
												>
													remove
												</button>
											</div>
										</div>
									</div>
								</li>
							</>
						);
					})
				) : (
					<div className="flex items-center justify-center">
						<p className="uppercase">Your cart is empty</p>
						{/* <div className="flex items-center justify-center">
						
					</div> */}
					</div>
				)}
				{totalProductsCount > 0 && (
					<div
						className={`flex flex-col  ${
							totalProductsCount > 0 ? "" : "justify-center"
						}`}
					>
						<div className="flex flex-col space-y-2">
							<div className="flex items-center justify-between w-full pt-5">
								<div>
									<p className="font-medium "> Subtotal </p>
								</div>
								<div>
									$
									{cart
										.reduce(
											(total, product) =>
												total + product.price * product.quantity,
											0
										)
										.toFixed(2)}
								</div>
							</div>

							<p className="pb-10 text-xs font-light">
								Taxes and shipping calculated at checkout
							</p>
						</div>
						<div className="flex flex-col gap-5">
							<div className="flex justify-end w-full space-x-4 ">
								<BuyItNowButton
									onClick={() => router.push("/checkout")}
									className="px-4 py-4 hover:scale-1 sm:w-[300px]"
								>
									Checkout
								</BuyItNowButton>
							</div>
							<div className="flex justify-end w-full space-x-4 ">
								<BuyItNowButton
									onClick={remove}
									className="w-full px-4 py-4 text-white bg-destructive hover:bg-red-600 hover:scale-1 sm:w-[300px]"
								>
									empty cart
								</BuyItNowButton>
							</div>
						</div>
					</div>
				)}
			</menu>
		</section>
	);
}
