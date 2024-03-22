"use client";

import React from "react";
import Loading from "../components/loading";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchProducts } from "../../../actions/fetchings";
import Image from "next/image";
import Productcard from "../../../components/global-components/product-card";
import Link from "next/link";

export default function Results({ query }) {
	// <div className="p-4 pb-0 max-h-[70vh] w-full overflow-y-auto">
	// 				<Loading />
	// 			</div>

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
		console.log(error);
		return <div>An error occured while fetching these products</div>;
	}

	if (productData && productData.length == 0) {
		return <div>No data found</div>;
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
