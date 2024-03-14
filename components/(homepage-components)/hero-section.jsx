"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode, Autoplay } from "swiper/modules";
import Image from "next/image";

import { heroImages } from "@/constants/hero-images";
export default function Herosection() {
	// { images }
	return (
		<Swiper
			slidesPerView={1}
			freeMode={true}
			autoplay={{ delay: 2000 }}
			pagination={{ clickable: true }}
			navigation={true}
			loop
			modules={[Pagination, Navigation, FreeMode, Autoplay]}
			className="h-[70vh] md:h-screen w-[98%] imageSlider mainSlider"
		>
			{heroImages?.map((image, i) => {
				return (
					<SwiperSlide key={image.id}>
						<Image
							src={image}
							alt={`art-${i}`}
							height={500}
							width={500}
							className="object-cover w-full h-full"
							sizes="(max-width: 480px) 100vw,
							(max-width: 768px) 75vw,
							(max-width: 1060px) 50vw,
							33vw"
							// style={{ objectFit: "cover" }}
							priority
						/>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}

// height={500}
// width={500}
// className="object-cover w-full h-full"
