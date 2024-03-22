export default function Loading() {
	return (
		<div className="flex flex-wrap items-center justify-around gap-4">
			{Array(4)
				.fill(null, 0) // Key index starts from 0
				.map((_, i) => (
					<figcaption
						key={i}
						className="animate-pulse"
						id={`image-placeholder-${i}`}
					>
						<div className="h-[150px] w-[150px] bg-muted-foreground "></div>
						<div className="mt-3 bg-muted-foreground h-[5px] w-full rounded-md"></div>
					</figcaption>
				))}
		</div>
	);
}
