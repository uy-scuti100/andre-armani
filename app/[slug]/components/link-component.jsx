import Link from "next/link";
import React from "react";

export default function LinkComponent({ className, children, href }) {
	return (
		<Link
			href={`?size=${href}`}
			className={`rounded-none hover:text-background  text-black font-light text-xs h-9 px-4 py-2 ${className}`}
		>
			{children}
		</Link>
	);
}
