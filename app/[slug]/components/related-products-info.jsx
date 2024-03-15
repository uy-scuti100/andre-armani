import Link from "next/link";
import Productcard from "../../../components/global-components/product-card";
import { shuffleArray } from "../../../lib/utils";

export default function RelatedProductsInfo({ relatedProducts }) {
	// Shuffle a copy of the relatedProducts array to avoid modifying the original
	const shuffledProducts = shuffleArray([...relatedProducts]);
	return (
		<section className="mt-32">
			{relatedProducts?.length > 0 && (
				<>
					<h2 className="text-lg text-center uppercase">
						you might want to check these out
					</h2>
					<div className="grid grid-cols-2 gap-4 mt-28 md:grid-cols-3 place-items-center">
						{shuffledProducts.slice(0, 3).map((item, i) => {
							return (
								<Link key={i} href={`/${item?.slug}`}>
									<Productcard key={i} {...item} />
								</Link>
							);
						})}
					</div>
				</>
			)}
		</section>
	);
}
