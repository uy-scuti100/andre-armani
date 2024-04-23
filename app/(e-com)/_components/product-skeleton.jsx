import React from "react";

const SkeletonProductInfo = () => {
	return (
		<section className="animate-pulse">
			<figure className="flex flex-col justify-center gap-10 px-[0.63rem] lg:flex-row">
				<div className="relative items-center justify-center sm:w-[80%] sm:mx-auto w-full flex h-[70vh] md:h-[80vh] lg:order-2 lg:basis-[60%] bg-gray-200 rounded-lg dark:bg-gray-700">
					{/* Placeholder for image */}
				</div>
				<div className="md:my-0 lg:order-1 lg:basis-[10%]">
					<div className="flex items-center justify-center gap-5 lg:flex-col">
						{/* Placeholder for image thumbnails */}
					</div>
				</div>

				<figcaption className="my-3 md:my-0 lg:order-3 lg:basis-[30%]">
					<div className="pb-6 text-xl font-medium uppercase bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700">
						{/* Placeholder for product name */}
					</div>

					<div className="pb-8 text-sm font-light bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700">
						{/* Placeholder for price */}
					</div>
					<div className="pb-6 text-xs font-light bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700">
						{/* Placeholder for sizes label */}
					</div>
					<div className="flex flex-wrap items-center gap-6 pb-8 text-sm font-light bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700">
						{/* Placeholder for size buttons */}
					</div>

					<div className="flex flex-col gap-5 mt-12">
						<div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
						<div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
					</div>
				</figcaption>
			</figure>
			<div className="px-[0.63rem] mt-20 ">
				<pre className="pb-8 text-sm font-light bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700">
					{/* Placeholder for features */}
				</pre>
				<menu className="flex flex-col gap-6">
					{/* Placeholder for description list */}
				</menu>
			</div>
		</section>
	);
};

export default SkeletonProductInfo;
