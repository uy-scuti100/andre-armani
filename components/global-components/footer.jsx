"use client";

import {
	GitHubLogoIcon,
	InstagramLogoIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const day = new Date().getUTCDay();
	const year = new Date().getFullYear();

	const today = days[day];

	const pathname = usePathname();
	if (pathname.startsWith("/admin/")) {
		return null;
	}
	return (
		<footer className="border-t border-foreground rounded-t-[50px] z-40 w-full py-32 mx-auto mt-32 bg-foreground/10">
			<div className="flex flex-col justify-between gap-20 px-5 md:flex-row">
				<div className="flex flex-col">
					<h3 className="mb-3 text-2xl font-semibold">ANDRÉ ARMANI</h3>
					<Separator className="mb-5 bg-foreground/50 " />
					<div className="flex flex-wrap justify-between">
						<p className="max-w-[300px] text-sm opacity-70 mb-5 leading-[200%]">
							Witness the artistry that stirs emotions and ignites imaginations.
							Explore a world of captivating creations.
						</p>
						<p className="max-w-[300px] text-sm opacity-70 leading-[200%]">
							Fuel your creative spirit. Discover works that spark inspiration
							and leave a lasting impression.
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-7">
					<h4 className="font-semibold tracking-widest text-center capitalize lg:text-left">
						follow us on socials
					</h4>

					<div className="flex flex-wrap items-center justify-center gap-5">
						<Link
							href={"https://twitter.com/hexelstudio"}
							target="_blank"
							className="flex items-center gap-2 px-4 py-2 transition-transform duration-500 ease-linear hover:scale-105 ring ring-inset rounded-2xl ring-foreground"
						>
							{" "}
							<TwitterLogoIcon /> <span>Twitter</span>
						</Link>
						<Link
							href={
								"https://www.tiktok.com/@osirisdigitalagency?_t=8kmUDm1QO0c&_r=1"
							}
							target="_blank"
							className="flex items-center gap-2 px-4 py-2 transition-transform duration-500 ease-linear hover:scale-105 ring ring-inset rounded-2xl ring-foreground"
						>
							<GitHubLogoIcon />
							<span>Tiktok</span>
						</Link>
						<Link
							href={
								"https://www.instagram.com/hexeldigitalstudio?igsh=OWx3YjhpbjE4NXg5&utm_source=qr"
							}
							target="_blank"
							className="flex items-center gap-2 px-4 py-2 transition-transform duration-500 ease-linear hover:scale-105 ring ring-inset rounded-2xl ring-foreground"
						>
							<InstagramLogoIcon /> <span>Instagram</span>
						</Link>
					</div>
				</div>
			</div>

			<div className="relative w-full my-20 overflow-hidden select-none md:mx-auto ">
				<div className="flex overflow-hidden scroll-smooth whitespace-nowrap ">
					<div className="logo_carousel">
						<h1 className="text-[12vh] font-semibold font-mono">
							{" "}
							ANDRÉ ARMANI. ANDRÉ ARMANI. ANDRÉ ARMANI. ANDRÉ ARMANI. ANDRÉ
							ARMANI. ANDRÉ ARMANI. ANDRÉ ARMANI. ANDRÉ ARMANI.
						</h1>
					</div>
					<div className="font-thin logo_carousel">
						<div className="text-[12vh] font-semibold">
							<h1>
								ANDRÉ ARMANI. ANDRÉ ARMANI. ANDRÉ ARMANI. ANDRÉ ARMANI. ANDRÉ
								ARMANI. ANDRÉ ARMANI. ANDRÉ ARMANI. ANDRÉ ARMANI.
							</h1>
						</div>
					</div>
				</div>
			</div>

			<Separator className=" bg-foreground/50" />

			<div className="px-5 mt-32">
				<div className="flex items-center justify-between gap-2">
					<p className="text-sm sm:text-base">
						Have a nice <span className="font-semibold">{today}</span>
					</p>
					<div className="bg-foreground/50 w-[60%] h-[1px]" />

					<p className="text-sm sm:text-base">
						Stay <span className="font-semibold">Artistic.</span>
					</p>
				</div>
			</div>

			<menu className="flex flex-wrap items-center justify-center gap-6 px-5 mt-32 text-foreground">
				<Link
					href="/collection"
					className="text-sm font-light underline uppercase tracking-[2px]"
				>
					Collections
				</Link>
				<Link
					href="/collection/framed-canvas"
					className="text-sm font-light underline uppercase tracking-[2px] "
				>
					Framed Canvas
				</Link>
				<Link
					href="/collection/paper-prints"
					className="text-sm font-light underline uppercase tracking-[2px] "
				>
					PRINTS ON PAPER
				</Link>
				<Link
					href="/collection/wears"
					className="text-sm font-light underline uppercase tracking-[2px] "
				>
					WEARS
				</Link>
			</menu>

			<div className="flex items-center justify-center mt-32">
				© 2022 — {year} Hexel Digital Studio LLC.
			</div>
		</footer>
	);
}

// </span>
/* <div>© 2022 — {year} Hexel Digital Studio LLC.</div> */
// }
