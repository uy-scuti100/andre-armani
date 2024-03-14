"use client";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Menubar() {
	return (
		<menu className="md:flex items-center gap-6 text-[13px] uppercase hidden ">
			<Link href={"/"} className="relative group">
				<div className="flex items-center">
					<span>Art</span>
					<CaretDownIcon className="transition-transform duration-500 group-hover:rotate-180" />
				</div>
				<div className=" z-50 absolute invisible h-auto px-4 py-2 duration-500 ease-in-out bg-background w-[200px] border-b shadow-2xl transition-tranform group-hover:visible -left-4 top-7">
					<div className="w-[500px] pb-4">Framed Canvas</div>
					<Separator orientation="horizontal" />
					<div className="w-[500px] py-4">Paper Prints</div>
				</div>
			</Link>

			<div className="flex items-center gap-6 ">
				<Link href={"/"} className="">
					Wear
				</Link>
				<Link href={"/"} className="">
					Story
				</Link>
			</div>
		</menu>
	);
}
