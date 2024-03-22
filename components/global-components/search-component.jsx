"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Input } from "../ui/input";
import SearchIcon from "./search-icon";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Search({ setOpenSearch }) {
	const [query, setQuery] = useState("");
	const [isSearching, startTransition] = useTransition();
	const router = useRouter();
	const inputRef = useRef();

	function search() {
		startTransition(() => {
			if (query !== "") {
				router.push(`/search?query=${query}`);
			}
		});
	}

	return (
		<>
			<div
				className={`px-[0.63rem] relative mx-auto w-full items-center h-auto opacity-100 my-5 overflow-hidden duration-700 ease-in-out flex `}
			>
				<Input
					disabled={isSearching}
					onKeyDown={(e) => {
						if (e.key === "Escape") {
							inputRef.current.blur();
							setQuery("");
						}
						if (e.key === "Enter" && query !== "") {
							search();
						}
					}}
					onChange={(e) => setQuery(e.target.value)}
					value={query}
					ref={inputRef}
					className="overflow-hidden text-xs outline-none"
					placeholder="Search..."
				/>

				<button
					className="duration-100 transition-colors ease-linear bg-[#C7C7C7] px-4 py-2 absolute right-2 rounded-br-md rounded-tr-md flex items-center justify-center disabled:bg-[#737373] disabled:cursor-not-allowed"
					onClick={search}
					disabled={query === ""}
				>
					<SearchIcon />
				</button>
			</div>
		</>
	);
}

// const [isSearching, set] = useTransition();
// useEffect(() => {
//     if(query){
//         // call search API
//         fetchSearchResults(query)
//     }
//     async function fetchSearchResults(query) {
//         // call search API
//       const results = await fetch('/api/search?q=' + query);
//       const data = await results.json();

//       // set search results
//       setSearchResults(data);
//     }
// }

{
	/* <MagnifyingGlassIcon className="w-6 h-6  cursor-pointer hover:translate-y-[-2px] transition-transform duration-300 ease-in-out" /> */
}
