"use client";
import { Input } from "../ui/input";
import Menubar from "./menu-bar";
import MenuIcon from "./menu-icon";
import SearchIcon from "./search-icon";
import Shoppingcart from "./shopping-cart";
import useStore from "../../store/cart";
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
		<header className="max-w-[1200px] fixed z-50 flex flex-col items-center justify-center w-full py-5 mx-auto bg-background overflow-hidden">
			<nav className="flex items-center justify-between w-full px-[0.63rem] z-50">
				<button>
					<Menubar />
					<MenuIcon />
				</button>

				<Link href="/" className="font-mono font-bold uppercase">
					Andre Armani
				</Link>
				<div className="text-[13px] uppercase flex items-center gap-5">
					<button onClick={() => setSearchInput((prev) => !prev)}>
						<SearchIcon />
					</button>
					<button>
						<Shoppingcart />
					</button>

					{quantityInCart > 0 && (
						<span className="flex items-center justify-center w-6 h-6 text-xs font-medium bg-[#C7C7C7] rounded-full ">
							{quantityInCart}
						</span>
					)}
				</div>
			</nav>

			<div
				className={`px-[0.63rem] relative mx-auto w-full items-center ${
					searchInput
						? "visible w-auto h-auto opacity-100 "
						: " invisible w-0 h-0 opacity-0"
				} my-5 overflow-hidden duration-700 ease-in-out flex `}
			>
				<Input
					className="overflow-hidden text-xs outline-none"
					placeholder="Search..."
				/>
				<button className=" bg-[#C7C7C7] px-4 py-2 absolute right-2 rounded-br-md rounded-tr-md flex items-center justify-center">
					<SearchIcon />
				</button>
			</div>
		</header>
	);
}
