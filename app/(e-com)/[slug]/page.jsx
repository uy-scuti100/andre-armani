import {
	fetchProducts,
	fetchSingleProduct,
	fetchAllArtwork,
	fetchSingleArtwork,
} from "../../../actions/fetchings";
import ProductInfo from "../_components/product-info";
import RelatedProductsInfo from "../_components/related-products-info";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function page({ params }) {
	const { slug } = params;
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["art-work", slug],
		queryFn: () => fetchSingleArtwork(slug),
	});

	return (
		<section className="pt-[6.438rem] px-[0.63rem]">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ProductInfo slug={slug} children={<RelatedProductsInfo />} />
			</HydrationBoundary>
		</section>
	);
}
