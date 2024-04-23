"use client";

import React from "react";
import Loading from "./loading";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchProducts } from "../../../../actions/fetchings";
import Productcard from "../../../../components/global-components/product-card";
import Link from "next/link";

export default function Fetchings({ query }) {
	const {
		data: productData,
		isError,
		isFetching,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["search-results", query],
		queryFn: () => fetchSearchProducts(query),
	});

	if (isLoading || isFetching) {
		return <Loading />;
	}

	if (isError) {
		return (
			<div className="mt-20 text-2xl font-medium text-center uppercase">
				Unable to fetch Products
			</div>
		);
	}

	if (productData && productData.length == 0) {
		return (
			<div className="text-xl font-semibold text-center">No results found</div>
		);
	}

	return (
		<div className="flex flex-wrap items-center justify-around gap-4">
			{productData?.map((item, i) => (
				<Link key={i} href={`/${item?.slug.current}`}>
					<Productcard key={i} {...item} />
				</Link>
			))}
		</div>
	);
}
