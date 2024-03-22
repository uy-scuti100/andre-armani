export default function Loading() {
	return (
		<div className="flex flex-wrap items-center justify-around gap-4">
			{Array(4)
				.fill(null, i)
				.map(() => (
					<figcaption key={i} className="animate-pulse">
						<div className="h-[150px] w-[150px] bg-muted-foreground "></div>
						<div className="mt-3 bg-muted-foreground h-[5px] w-full rounded-md"></div>
						<div className="mt-3 bg-muted-foreground h-[5px] text-center w-1/2 rounded-md"></div>
					</figcaption>
				))}
		</div>
	);
}
