"use client";

import Link from "next/link";

export default function Menubar() {
	return (
		<menu className="md:flex items-center justify-center gap-6 text-[13px] uppercase hidden z-[999999]">
			<Link href={"/collection"}>Collections</Link>
			<Link href={"/collection/wears"}>Wear</Link>
			<Link href={"/story"}>Story</Link>
		</menu>
	);
}
