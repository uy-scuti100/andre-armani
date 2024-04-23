"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode, Autoplay } from "swiper/modules";
import Image from "next/image";

import { heroImages } from "../../../../constants/hero-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function Herosection() {
	useGSAP(() => {
		gsap.to(".hero__swipe", {
			duration: 1,
			delay: 0,
			clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
			ease: "power3.in",
		});
	});

	return (
		<Swiper
			slidesPerView={1}
			// freeMode={true}
			autoplay={{
				delay: 2000,
				pauseOnMouseEnter: true,
				// reverseDirection: true,
				disableOnInteraction: true,
			}}
			pagination={{ clickable: true }}
			navigation={true}
			loop
			modules={[Pagination, Navigation, FreeMode, Autoplay]}
			className="h-[85vh] md:h-screen w-[98%] imageSlider mainSlider -z-10 hero__swipe"
			style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
		>
			{heroImages?.map((image, i) => {
				return (
					<SwiperSlide key={image.id}>
						<Image
							src={image}
							alt={`art-${i}`}
							height={500}
							width={500}
							className="object-cover w-full h-[95%]"
							sizes="(max-width: 480px) 100vw,
							(max-width: 768px) 75vw,
							(max-width: 1060px) 50vw,
							33vw"
							priority={true}
						/>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}
