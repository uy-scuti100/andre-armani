import React from "react";
import { fetchProducts } from "../../../actions/fetchings";
import Link from "next/link";
import Productcard from "../../../components/global-components/product-card";

export default async function page() {
	const products = await fetchProducts();
	const printedWearsProducts = [];

	for (let i = 0; i < products.length; i++) {
		const prod = products[i];

		if (prod.type === "printed_hoodies") {
			printedWearsProducts.push(prod);
		}
	}

	return (
		<section className="pt-[6.438rem]">
			<h2 className="text-lg text-center uppercase tracking-[6px]">wears</h2>

			<div className="mt-[45px] px-[0.685rem]">
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 place-items-center">
					{printedWearsProducts?.map((item, i) => {
						return (
							<Link key={i} href={`/${item?.slug}`}>
								<Productcard key={i} {...item} />
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
