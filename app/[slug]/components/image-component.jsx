import Image from "next/image";
import React from "react";

export default function Imagecomponent({ src, base64 }, alt) {
	return (
		<Image
			src={src}
			alt={alt}
			height={500}
			width={300}
			className="object-cover w-full h-full"
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			placeholder="blur"
			blurDataURL={base64}
			priority={true}
		/>
	);
}
