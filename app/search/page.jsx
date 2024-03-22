import { fetchSearchProducts } from "../../actions/fetchings";

import Results from "../../components/global-components";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function SearchPage({ searchParams }) {
	const query = searchParams.query;
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["search-results", query],
		queryFn: () => fetchSearchProducts(query),
	});

	return (
		<section className="pt-[8.438rem] relative">
			<div className="w-full mx-auto">
				<div className="flex flex-col gap-2 p-4 mt-auto">
					<div className="text-sm font-semibold text-center text-foreground">
						Search results for{" "}
						<span className="font-semibold capitalize">{query}</span>
					</div>
				</div>

				<div className="w-full p-4">
					<HydrationBoundary state={dehydrate(queryClient)}>
						<Results query={query} />
					</HydrationBoundary>
				</div>
			</div>
			{/* <div className="fixed bottom-0 flex flex-col w-full gap-2 p-4 mt-auto ">
				<p className="text-xs text-center text-muted-foreground">
					copyright &copy; Andre Armani
				</p>
			</div> */}
		</section>
	);
}
