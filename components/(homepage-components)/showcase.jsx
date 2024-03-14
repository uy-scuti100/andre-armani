import {
	fetchCanvasData,
	fetchPrintsData,
	fetchWearsData,
} from "@/actions/fetchings";
import Image from "next/image";
import Productcard from "../global-components/product-card";

export default async function Showcase() {
	const canvasData = await fetchCanvasData();
	const printsData = await fetchPrintsData();
	const wearsData = await fetchWearsData();
	return (
		<section className="mt-28">
			<h2 className="text-lg text-center uppercase">Framed canvas</h2>

			<div className="mt-[45px]">
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 place-items-center">
					{canvasData.slice(0, 6)?.map((item, i) => {
						return <Productcard key={i} {...item} />;
					})}
				</div>
			</div>

			<div className="mt-28">
				<h2 className="text-lg text-center uppercase">Prints on Paper</h2>

				<div className="mt-[45px]">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 place-items-center">
						{printsData.slice(0, 6)?.map((item, i) => {
							return <Productcard key={i} {...item} />;
						})}
					</div>
				</div>
			</div>
			<div className="mt-28">
				<h2 className="text-lg text-center uppercase">Wears</h2>

				<div className="mt-[45px]">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 place-items-center">
						{wearsData.slice(0, 6)?.map((item, i) => {
							return <Productcard key={i} {...item} />;
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
