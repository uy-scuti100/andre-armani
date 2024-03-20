import Image from "next/image";
import React from "react";

export default function ImageSwitchComponent({ src, className, alt, base64 }) {
	return (
		<Image
			src={src}
			height={100}
			width={100}
			className={className}
			alt={alt}
			placeholder="blur"
			blurDataURL={base64}
		/>
	);
}
