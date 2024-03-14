"use client";
import { Input } from "@/components/ui/input";
import Menubar from "./menu-bar";
import MenuIcon from "./menu-icon";
import SearchIcon from "./search-icon";
import Shoppingcart from "./shopping-cart";
import useStore from "@/store/cart";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
	const [quantityInCart, setQuantityInCart] = useState(0);
	const [searchInput, setSearchInput] = useState(false);

	// Subscribe to changes in cart quantity
	useStore.subscribe(
		(cart) => {
			setQuantityInCart(useStore.getTotalQuantityInCart());
		},
		(state) => state.cart
	);
	return (
		<header className="py-5">
			<nav className="flex items-center justify-between ">
				<div>
					<Menubar />
					<MenuIcon />
				</div>

				<Link href="/" className="font-mono font-medium uppercase">
					Andre Armani
				</Link>
				<div className="text-[13px] uppercase flex items-center gap-5">
					<div onClick={() => setSearchInput((prev) => !prev)}>
						<SearchIcon />
					</div>
					<Shoppingcart />

					{quantityInCart > 0 && (
						<span className="flex items-center justify-center w-6 h-6 text-xs font-medium bg-[#C7C7C7] rounded-full ">
							{quantityInCart}
						</span>
					)}
				</div>
			</nav>

			<div
				className={`relative items-center ${
					searchInput
						? "visible w-auto h-auto opacity-100 "
						: " invisible w-0 h-0 opacity-0"
				} my-5 overflow-hidden duration-700 ease-in-out `}
			>
				<Input
					className="overflow-hidden text-xs outline-none "
					placeholder="Search"
				/>
				<div className=" bg-[#C7C7C7] px-4 py-2 absolute right-0 rounded-br-md rounded-tr-md flex items-center justify-center">
					<SearchIcon />
				</div>
			</div>
		</header>
	);
}
