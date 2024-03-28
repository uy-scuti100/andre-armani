"use client";

import React from "react";
import { useStore } from "../../store/cart";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CartProducts() {
	const cart = useStore((state) => state.cart);

	const removeFromCart = useStore((state) => state.removeFromCart);
	const increaseQuantity = useStore((state) => state.increaseQuantity);
	const decreaseQuantity = useStore((state) => state.decreaseQuantity);

	return (
		<menu className="flex flex-col space-y-6">
			{cart.length > 0 ? (
				cart.map((item) => {
					const { _id, name, image, price, quantity, selectedSize } = item;
					const newPrice = (parseFloat(price) * quantity).toFixed(2);
					return (
						<li key={_id} className="flex justify-start space-x-2">
							<div className="flex items-start justify-start w-full gap-3">
								<div>
									<Image
										src={image}
										width={80}
										height={80}
										alt={name}
										className="object-cover w-24 h-24"
									/>
								</div>
								<div className="flex justify-between w-full">
									<div className="flex flex-col items-start">
										<Link href={`/${_id}`} className="text-xs font-bold">
											{name.substring(0, 12)}..
										</Link>
										<h3 className="text-xs">${newPrice}</h3>
										<p className="text-xs">Size: {selectedSize}</p>
										<p className="text-xs">Qty: {quantity}</p>
										<button
											className="text-xs underline text-destructive"
											onClick={() => removeFromCart(_id, selectedSize)}
										>
											remove
										</button>
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
									</div>
								</div>
							</div>
						</li>
					);
				})
			) : (
				<div>
					<p>Your cart is empty</p>
				</div>
			)}
		</menu>
	);
}
