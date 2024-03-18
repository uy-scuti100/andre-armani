import Link from "next/link";
import Productcard from "../../../components/global-components/product-card";
import { shuffleArray } from "../../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchRelatedProducts } from "../../../actions/fetchings";
import RelatedProductsSkeleton from "../../../components/global-components/related-products-skeleton";
import SkeletonProductInfo from "../../../components/global-components/product-skeleton";

export default function RelatedProductsInfo({ type, slug }) {
	const { data, isLoading, isFetching, isError, status } = useQuery({
		queryKey: ["related-products", type],
		queryFn: () => fetchRelatedProducts(slug, type),
		staleTime: 1000 * 60 * 5,
	});

	console.log(data);
	if (isError) {
		return <div>error</div>;
	}
	if (isFetching || isLoading || status.pending) {
		return <RelatedProductsSkeleton />;
	}

	if (data && data.length == 0) {
		return <div>No data found</div>;
	}

	const shuffledProducts = shuffleArray([...data]);

	return (
		<section className="mt-32">
			{shuffledProducts && shuffledProducts?.length > 0 && (
				<>
					<h2 className="text-lg text-center uppercase">
						you might want to check these out
					</h2>
					<div className="grid grid-cols-2 gap-4 mt-28 md:grid-cols-3 place-items-center">
						{shuffledProducts?.slice(0, 4).map((item, i) => {
							return (
								<Link key={i} href={`/${item?.slug.current}`}>
									<Productcard key={item.slug.current} {...item} />
								</Link>
							);
						})}
					</div>
				</>
			)}
		</section>
	);
}
