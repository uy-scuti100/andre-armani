import { fetchProducts } from "../../actions/fetchings";
import { shuffleArray } from "../../lib/utils";

import Productcard from "../global-components/product-card";
import Link from "next/link";

export default async function Showcase() {
	const products = await fetchProducts();

	const framedCanvasProducts = [];
	const printedPaperProducts = [];
	const printedWearsProducts = [];

	for (let i = 0; i < products.length; i++) {
		const prod = products[i];

		if (prod.type === "art_collection") {
			framedCanvasProducts.push(prod);
		} else if (prod.type === "prints_on_paper") {
			printedPaperProducts.push(prod);
		} else {
			printedWearsProducts.push(prod);
		}
	}

	const shuffledframedCanvas = shuffleArray([...framedCanvasProducts]);
	const shuffledfPaperProducts = shuffleArray([...printedPaperProducts]);
	const shuffledWearsProducts = shuffleArray([...printedWearsProducts]);

	return (
		<section className="mt-28">
			<h2 className="text-lg text-center uppercase tracking-[6px]">
				Framed canvas
			</h2>

			<div className="mt-[45px]">
				<div className="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-3 place-items-center px-[0.685rem]">
					{shuffledframedCanvas.slice(0, 6)?.map((item, i) => {
						return (
							<Link key={i} href={`/${item?.slug}`}>
								<Productcard {...item} />
							</Link>
						);
					})}
				</div>
			</div>

			<div className="mt-28">
				<h2 className="text-lg text-center uppercase tracking-[6px]">
					Prints on Paper
				</h2>

				<div className="mt-[45px] px-[0.685rem]">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 place-items-center">
						{shuffledfPaperProducts.slice(0, 6)?.map((item, i) => {
							return (
								<Link key={i} href={`/${item?.slug}`}>
									<Productcard key={i} {...item} />
								</Link>
							);
						})}
					</div>
				</div>
			</div>
			<div className="mt-28">
				<h2 className="text-lg text-center uppercase tracking-[6px]">Wears</h2>

				<div className="mt-[45px]">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 place-items-center px-[0.685rem]">
						{shuffledWearsProducts.slice(0, 6)?.map((item, i) => {
							return (
								<Link key={i} href={`/${item?.slug}`}>
									<Productcard key={i} {...item} />
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
