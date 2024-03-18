"use client";
import { Input } from "../ui/input";
import MenuIcon from "./menu-icon";
import Logosvg from "./logo-svg";
import SearchIcon from "./search-icon";
import Shoppingcart from "./shopping-cart";
import useStore from "../../store/cart";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import navbarImage from "../../assets/navbar-img.webp";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Header() {
	const [quantityInCart, setQuantityInCart] = useState(0);
	const [searchInput, setSearchInput] = useState(false);
	// const [searchTerm, setSearchTerm] = useState("");
	// const [searchOpen, setSearchOpen] = useState(false);
	const [openNav, setOpenNav] = useState(false);
	const headerRef = useRef();
	const navRef = useRef();
	const tl = useRef();
	const pathname = usePathname();
	useGSAP(() => {
		tl.current = gsap.timeline({ paused: true });

		tl.current
			.to(navRef.current, {
				duration: 0.8,
				ease: "power4.inOut",
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				pointerEvents: "all",
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
			.to(".animated-box", {
				duration: 1,
				delay: 0,
				opacity: 1,
				stagger: {
					amount: 0.4,
				},
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "power4.inOut",
			})
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
	}, []);

	useEffect(() => {
		const tl = gsap.timeline();
		tl.to(headerRef.current, {
			y: 0,
			duration: 1,
			opacity: 1,
			ease: "bounce.out",
		});
		return () => {
			tl.kill(); // Clear the timeline and its animations
		};
	}, [pathname]);

	const toggleNavOpen = () => {
		setOpenNav((prev) => !prev);
		if (openNav) {
			tl.current?.reverse();
		} else {
			tl.current?.play();
		}
	};
	useStore.subscribe(
		(cart) => {
			setQuantityInCart(useStore.getTotalQuantityInCart());
		},
		(state) => state.cart
	);
	return (
		<header
			ref={pathname === "/" ? null : headerRef}
			className=" -translate-y-10 opacity-0 max-w-[1200px] fixed z-40 flex flex-col items-center justify-center w-full mx-auto bg-background overflow-hidden"
		>
			<nav className="flex items-center justify-between py-5 w-full px-[0.63rem] z-50">
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
					<button onClick={() => setSearchInput((prev) => !prev)}>
						<SearchIcon />
					</button>
					<div className="flex items-center space-x-[2px]">
						<Sheet>
							<SheetTrigger asChild>
								<button>
									<Shoppingcart />
								</button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>
										<Link href="/" className="font-mono font-bold uppercase">
											André Armani
										</Link>
									</SheetTitle>
									<SheetDescription>
										Make changes to your profile here. Click save when you're
										done.
									</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>

						{quantityInCart > 0 && (
							<span className="flex text-black items-center justify-center w-6 h-6 text-xs font-medium bg-[#C7C7C7] rounded-full ">
								{quantityInCart}
							</span>
						)}
					</div>
				</div>
			</nav>

			<div
				className={`px-[0.63rem] relative mx-auto w-full items-center ${
					searchInput
						? "block w-auto h-auto opacity-100 "
						: "hidden w-0 h-0 opacity-0"
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
			{/* mobile-nav */}
			<div
				ref={navRef}
				className={`bg-background sm:hidden fixed overflow-hidden inset-0 pointer-events-none z-50 `}
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
					className="tracking-[6px] flex flex-col absolute top-10 sm:top-5 justify-center items-center w-full animated-box opacity-0 "
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
							href={"https://twitter.com/hexelstudio "}
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
		</header>
	);
}
