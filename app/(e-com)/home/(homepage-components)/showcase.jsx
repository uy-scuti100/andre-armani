import { fetchAllArtwork } from "../../../../actions/fetchings";
import { shuffleArray } from "../../../../lib/utils";

import Productcard from "../../../../components/global-components/product-card";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

export default async function Showcase() {
	const products = await fetchAllArtwork();

	// Shuffle the entire product list
	const shuffledProducts = shuffleArray([...products]);

	const framedCanvasProducts = shuffledProducts.filter(
		(prod) => prod.type === "framed-canvas"
	);
	const printedPaperProducts = shuffledProducts.filter(
		(prod) => prod.type === "printed-paper"
	);
	const printedWearsProducts = shuffledProducts.filter(
		(prod) => prod.type === "printed_hoodies"
	);

	return (
		<section className="mt-28">
			{/* Framed Canvas */}
			<h2 className="text-lg text-center uppercase tracking-[6px]">
				Framed canvas
			</h2>

			<div className="mt-[45px]">
				<div>
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 place-items-center px-[0.685rem]">
						{framedCanvasProducts.slice(0, 6)?.map((item, i) => {
							return (
								<Link key={i} href={`/${item?.slug.current}`}>
									<Productcard {...item} />
								</Link>
							);
						})}
					</div>
				</div>
				<div className="flex items-center justify-center mt-20">
					<Button className="bg-[rgb(83,83,83)] hover:bg-[rgb(83,83,83)]  font-light w-auto rounded-none px-10 py-6 text-base text-white uppercase mb-8 shadow-none hover:scale-105 transition-transform duration-300 ease-in-out ">
						<Link href={"/collection/framed-canvas"}>See More</Link>
					</Button>
				</div>
			</div>

			{/* Printed on Paper */}
			<div className="mt-28">
				<h2 className="text-lg text-center uppercase tracking-[6px]">
					Prints on Paper
				</h2>

				<div className="mt-[45px] px-[0.685rem]">
					<div>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 place-items-center">
							{printedPaperProducts.slice(0, 6)?.map((item, i) => {
								return (
									<Link key={i} href={`/${item?.slug.current}`}>
										<Productcard key={i} {...item} />
									</Link>
								);
							})}
						</div>
					</div>
					<div className="flex items-center justify-center mt-20">
						<Button className="bg-[rgb(83,83,83)] hover:bg-[rgb(83,83,83)]  font-light w-auto rounded-none px-10 py-6 text-base text-white uppercase mb-8 shadow-none hover:scale-105 transition-transform duration-300 ease-in-out ">
							<Link href={"/collection/paper-prints"}>See More</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Wears */}
			<div className="mt-28">
				<h2 className="text-lg text-center uppercase tracking-[6px]">Wears</h2>

				<div className="mt-[45px]">
					<div>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 place-items-center px-[0.685rem]">
							{printedWearsProducts.slice(0, 6)?.map((item, i) => {
								return (
									<Link key={i} href={`/${item?.slug.current}`}>
										<Productcard key={i} {...item} />
									</Link>
								);
							})}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center mt-20">
					<Button className="bg-[rgb(83,83,83)] hover:bg-[rgb(83,83,83)]  font-light w-auto rounded-none px-10 py-6 text-base text-white uppercase mb-8 shadow-none hover:scale-105 transition-transform duration-300 ease-in-out ">
						<Link href={"/collection/wears"}>See More</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
