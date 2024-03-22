"use client";
import Search from "./search-component";
import MenuIcon from "./menu-icon";
import Logosvg from "./logo-svg";
import SearchIcon from "./search-icon";
import Shoppingcart from "./shopping-cart";
import { useStore } from "../../store/cart";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import navbarImage from "../../assets/navbar-img.webp";
import CartProducts from "./cart-products";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import Image from "next/image";
import AddToCartButton from "../../app/[slug]/components/addtocart-button-component";
import BuyItNowButton from "../../app/[slug]/components/buyitnow-button-component";

export default function Header() {
	const [totalProductsCount, setTotalProductsCount] = useState(0);
	const [openNav, setOpenNav] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	const headerRef = useRef();
	const navRef = useRef();
	const searchRef = useRef();
	const tl = useRef();
	const tl2 = useRef();
	const pathname = usePathname();
	useGSAP(() => {
		tl.current = gsap.timeline({ paused: true });
		tl2.current = gsap.timeline({ paused: true });

		tl.current
			.to(navRef.current, {
				duration: 0.8,
				ease: "power4.inOut",
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				pointerEvents: "all",
			})
			.to(".animated-box", {
				duration: 1,
				delay: 0,
				stagger: {
					amount: 0.4,
				},
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "power4.inOut",
			})
			.from(
				".menu__item",
				{
					duration: 1.7,
					delay: 0,
					x: -100,
					opacity: 0,
					stagger: {
						amount: 0.4,
					},
					ease: "expo.easeOut",
				},
				"-=1"
			)
			.from(
				".socials",
				{
					duration: 0.5,
					y: 100,
					opacity: 0,
					stagger: {
						amount: 0.4,
					},
					ease: "expo.easeOut",
				},
				"-=1.4"
			)
			.from(
				".close-btn",
				{
					duration: 0.3,
					x: 300,
					opacity: 0,
					ease: "expo.easeOut",
				},
				"-=1.3"
			);

		tl2.current.to(searchRef.current, {
			duration: 0.5,
			display: "flex",
			opacity: 1,
			y: 0,
			ease: "expo.easeOut",
		});
	}, []);

	const toggleNavOpen = () => {
		setOpenNav((prev) => !prev);
		if (openNav) {
			tl.current?.reverse();
		} else {
			tl.current?.play();
		}
	};
	const toggleSearchOpen = () => {
		setOpenSearch((prev) => !prev);
		if (openSearch) {
			tl2.current?.reverse();
		} else {
			tl2.current?.play();
		}
	};

	const cart = useStore((state) => state.cart);
	const remove = useStore((state) => state.removeAll);

	useEffect(() => {
		let totalCount = 0;
		cart.forEach((item) => {
			totalCount += item.quantity;
		});
		setTotalProductsCount(totalCount);
	}, [cart]);

	return (
		<header
			ref={pathname === "/" ? null : headerRef}
			className="fixed z-40 flex flex-col items-center justify-center w-full mx-auto overflow-hidden bg-background"
		>
			<nav className="flex items-center justify-between py-5 w-full px-[1.25rem] z-50">
				<menu className="md:flex items-center justify-center space-x-6 text-[13px] uppercase hidden z-[999999]">
					<Link href={"/collection"}>Art</Link>
					<Link href={"/collection/wears"}>Wear</Link>
					<Link href={"/story"}>Story</Link>
				</menu>
				<div className="md:hidden">
					<MenuIcon onClick={toggleNavOpen} />
				</div>

				<Link href="/home" className="font-mono font-bold uppercase">
					André Armani
				</Link>
				<div className="text-[13px] uppercase flex items-center gap-5">
					<button onClick={toggleSearchOpen}>
						<SearchIcon />
					</button>
					<div className="flex items-center space-x-[2px]">
						<Sheet>
							<SheetTrigger asChild>
								<button>
									<Shoppingcart />
								</button>
							</SheetTrigger>
							<SheetContent className="flex flex-col h-full justfy-between">
								<SheetHeader>
									<SheetTitle className="mb-6">
										<Link
											href="/"
											className="font-light uppercase tracking-[6px] "
										>
											Your Cart
										</Link>
									</SheetTitle>
								</SheetHeader>
								<>
									{totalProductsCount > 0 ? (
										<>
											<div className="overflow-y-auto h-[90%]">
												<CartProducts />
											</div>
											<SheetFooter
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
												<div className="flex justify-center w-full space-x-4">
													<AddToCartButton
														onClick={() => {}}
														className="px-4 py-4 hover:scale-1"
													>
														View Cart
													</AddToCartButton>
													<BuyItNowButton
														onClick={() => {}}
														className="px-4 py-4 hover:scale-1"
													>
														Checkout
													</BuyItNowButton>
												</div>
												<div>
													<BuyItNowButton
														onClick={remove}
														className="px-4 py-4 text-white bg-destructive hover:bg-red-600 hover:scale-1"
													>
														empty cart
													</BuyItNowButton>
												</div>
											</SheetFooter>
										</>
									) : (
										<>
											<div className="mt-20 text-center">
												Your cart is empty
											</div>
										</>
									)}
								</>
							</SheetContent>
						</Sheet>

						{totalProductsCount > 0 && (
							<span className="flex text-black items-center justify-center w-6 h-6 text-xs font-medium bg-[#C7C7C7] rounded-full ">
								{totalProductsCount}
							</span>
						)}
					</div>
				</div>
			</nav>

			{/* mobile-nav */}
			<div
				ref={navRef}
				className={`bg-background sm:hidden fixed overflow-hidden inset-0 pointer-events-none z-50`}
				style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
			>
				<div className="absolute right-0 px-5 top-5 ">
					<Button
						onClick={toggleNavOpen}
						variant={"ghost"}
						className="font-light uppercase close-btn"
					>
						Close
					</Button>
				</div>

				<div
					className="absolute flex flex-col items-center justify-center w-full top-10 sm:top-5 animated-box"
					style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
				>
					<div>
						<Logosvg className={"logo-svg"} />
					</div>
					<div className="mt-4 w-full h-[150px] px-4 ">
						<Image
							src={navbarImage}
							alt="navbar-image"
							width={300}
							height={150}
							className="object-cover w-full h-full"
						/>
					</div>
				</div>

				<menu className="absolute z-50 flex flex-col gap-12 px-5 bottom-20 sm:bottom-10 group ">
					<Link
						href="/collection"
						className="uppercase tracking-[6px] text-2xl font-light menu__item"
						onClick={toggleNavOpen}
					>
						Collections
					</Link>
					<Link
						href="/collection/framed-canvas"
						className="w-full uppercase tracking-[6px] text-2xl font-light menu__item"
						onClick={toggleNavOpen}
					>
						Framed Canvas
					</Link>
					<Link
						href="/collection/paper-prints"
						className="w-full  uppercase tracking-[6px] text-2xl font-light menu__item"
						onClick={toggleNavOpen}
					>
						PRINTS ON PAPER
					</Link>
					<Link
						href="/collection/wears"
						className="w-full uppercase tracking-[6px] text-2xl font-light menu__item"
						onClick={toggleNavOpen}
					>
						WEARS
					</Link>
				</menu>

				<div className="absolute right-0 px-10 bottom-10 sm:bottom-3">
					<div className="flex items-center gap-4 text-sm font-normal md:text-xl justify-items-end">
						<Link
							href={"https://twitter.com/hexelstudio"}
							target="_blank"
							className="uppercase socials"
						>
							Twitter
						</Link>
						<Link
							className="uppercase socials"
							href={
								"https://www.instagram.com/hexeldigitalstudio?igsh=OWx3YjhpbjE4NXg5&utm_source=qr"
							}
							target="_blank"
						>
							Instagram
						</Link>
						<Link
							className="uppercase socials"
							href={
								"https://www.tiktok.com/@osirisdigitalagency?_t=8kmUDm1QO0c&_r=1"
							}
							target="_blank"
						>
							Tiktok
						</Link>
					</div>
				</div>
			</div>

			<div
				ref={searchRef}
				className=" abslute justify-center w-full hidden opacity-0 translate-y-[-300%]"
			>
				<Search setOpenSearch={setOpenSearch} />
			</div>
		</header>
	);
}
