import { Button } from "../../../../components/ui/button";

export default function AddToCartButton({ onClick, children, className }) {
	return (
		<Button
			onClick={onClick}
			className={`bg-[rgb(83,83,83)] hover:bg-[rgb(83,83,83)]  font-light w-full rounded-none py-6 text-base text-white uppercase mb-8 shadow-none hover:scale-105 transition-transform duration-300 ease-in-out ${className} `}
		>
			{children}
		</Button>
	);
}
