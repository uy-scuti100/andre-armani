export default function MenuIcon({ onClick }) {
	return (
		<button onClick={onClick}>
			<svg
				aria-hidden="true"
				fill="none"
				focusable="false"
				width="24"
				class="header__nav-icon icon icon-hamburger"
				viewBox="0 0 24 24"
			>
				<path
					d="M1 19h22M1 12h22M1 5h22"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="square"
				></path>
			</svg>
		</button>
	);
}
