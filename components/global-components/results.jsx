"use client";

import React, { useEffect, useRef } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export default function Results({ products, setOpenDrawer }) {
	const resultsRef = useRef();

	const handleClickOutside = (event) => {
		const { current } = resultsRef;

		if (!current?.contains(event.target)) {
			setOpenDrawer(false);
		}
	};

	useEffect(() => {
		const listener = document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", listener);
	}, [setOpenDrawer]);

	return (
		<section ref={resultsRef} className="fixed inset-0 z-50 bg-black/80">
			<div
				onClick={(event) => event.stopPropagation()}
				className="fixed inset-x-0 bottom-0 z-50 mt-10 flex h-auto flex-col rounded-t-[10px] border bg-background"
			>
				<div className="w-full mx-auto">
					<div className="flex flex-col gap-2 p-4 mt-auto">
						<div className="text-sm font-semibold text-center text-foreground">
							Search results for Aurora Art
						</div>
					</div>

					<div className="p-4 pb-0 max-h-[70vh] w-full overflow-y-auto">
						<div className="flex flex-wrap items-center justify-around gap-4">
							{Array(4)
								.fill(null, 0) // Key index starts from 0
								.map((_, i) => (
									<figcaption
										key={i}
										className="animate-pulse"
										id={`image-placeholder-${i}`}
									>
										<div className="h-[150px] w-[150px] bg-muted-foreground "></div>
										<div className="mt-3 bg-muted-foreground h-[5px] w-full rounded-md"></div>
									</figcaption>
								))}
						</div>
					</div>
					{/* footer */}
					<div className="flex flex-col gap-2 p-4 mt-auto">
						<p className="text-xs text-center text-muted-foreground">
							copyright &copy; Andre Armani
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
