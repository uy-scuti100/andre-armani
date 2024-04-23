"use client";
import { useRouter } from "next/navigation";
import React from "react";
useRouter;

export default function LinkComponent({ className, children, href }) {
	const router = useRouter();
	return (
		<button
			onClick={() => router.replace(`?size=${href}`, { scroll: false })}
			className={`rounded-none hover:text-background  text-black font-light text-xs h-9 px-4 py-2 ${className}`}
		>
			{children}
		</button>
	);
}

// onClick={() => router.replace(`?size=${href}`, { scroll: false })}
// 			href={}
