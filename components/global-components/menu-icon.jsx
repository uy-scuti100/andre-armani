export default function MenuIcon({ onClick }) {
	return (
		<button>
			<svg
				onClick={onClick}
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-grip"
			>
				<circle cx="12" cy="5" r="1" />
				<circle cx="19" cy="5" r="1" />
				<circle cx="5" cy="5" r="1" />
				<circle cx="12" cy="12" r="1" />
				<circle cx="19" cy="12" r="1" />
				<circle cx="5" cy="12" r="1" />
				<circle cx="12" cy="19" r="1" />
				<circle cx="19" cy="19" r="1" />
				<circle cx="5" cy="19" r="1" />
			</svg>
		</button>
	);
}
