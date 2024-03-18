import React from "react";

export default function RelatedProductsInfoSkeleton() {
	const sample = ["", "", "", "", "", ""];
	return (
		<div>
			<div className="grid grid-cols-2 gap-4 mt-28 md:grid-cols-3 place-items-center animate-pulse">
				{sample.map((s, i) => (
					<figure key={i} className="flex flex-col gap-6">
						<div className="relative group w-[180px] md:w-[250px] h-[200px] lg:w-[300px] md:h-[300px] lg:[450px] animate-pulse">
							{/* Responsive placeholder for the main image */}
							<div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="font-medium truncate text-ellipsis overflow-hidden ... animate-pulse">
								<div className="h-4 bg-gray-200 rounded-lg"></div>
							</div>
							<div className="text-xs opacity-50 animate-pulse">
								<div className="h-2 bg-gray-200 rounded-lg"></div>
							</div>
						</div>
					</figure>
				))}
			</div>
		</div>
	);
}
