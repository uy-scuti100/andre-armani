"use client";
import {
	// useQuery,
	// useMutation,
	// useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function ReactQueryProvider({ children }) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
