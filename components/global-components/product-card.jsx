import Image from "next/image";
import React from "react";

export default function Productcard({ name, slug, price, images, i, base64 }) {
	return (
		<figure key={slug.current} className="flex flex-col gap-6">
			<div className="relative group w-[180px] md:w-[250px] h-[200px] lg:w-[300px] md:h-[300px] lg:[450px]">
				<Image
					src={images[0]}
					alt={`${name}-${i}`}
					width={500}
					height={500}
					className=" object-cover w-full h-[200px]  md:h-[300px] lg:[450px]"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					placeholder="blur"
					blurDataURL={base64}
				/>

				{images.length > 1 && (
					<div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
						{" "}
						<Image
							src={images[1]}
							alt={`${name}-${i}`}
							width={500}
							height={500}
							className=" object-cover w-full h-[200px]  md:h-[300px] lg:[450px]"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<div className="font-medium truncate text-ellipsis overflow-hidden ...">
					{name.length > 18 ? (
						<div>&quot;{name.substring(0, 15)}..&quot;</div>
					) : (
						<div>"{name}"</div>
					)}
				</div>
				<div className="text-xs opacity-70">${price}</div>
			</div>
		</figure>
	);
}
