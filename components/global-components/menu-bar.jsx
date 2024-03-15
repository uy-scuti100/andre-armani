"use client";

import { CaretDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Menubar() {
	return (
		<menu className="md:flex items-center gap-6 text-[13px] uppercase hidden z-50">
			<menu href={"/"} className="relative group">
				<div className="flex items-center">
					<Link href={"/collection"}>Art</Link>
					<CaretDownIcon className="transition-transform duration-500 group-hover:rotate-180" />
				</div>
				<div className="absolute left-0 z-50 invisible w-[150px] h-auto py-2 duration-500 ease-in-out border-b shadow-2xl bg-background transition-tranform group-hover:visible top-7">
					<Link href={"/collection/framed-canvas"} className="py-6 text-sm">
						Framed Canvas
					</Link>
					<Separator orientation="horizontal" />
					<Link href={"/collection/framed-canvas"} className="py-6 text-sm">
						Paper Prints
					</Link>
				</div>
			</menu>

			<div className="flex items-center gap-6 ">
				<Link href={"/collection/wears"} className="">
					Wear
				</Link>
				<Link href={"/story"} className="">
					Story
				</Link>
			</div>
		</menu>
	);
}
