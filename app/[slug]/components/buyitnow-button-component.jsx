import { Button } from "../../../components/ui/button";
export default function BuyItNowButton({ onClick, children, className }) {
	return (
		<Button
			onClick={onClick}
			className={`w-full py-6 text-base font-light uppercase transition-transform duration-300 ease-in-out rounded-none shadow-none bg-foreground/10 hover:bg-foreground/10 text-foreground hover:scale-105 ${className}`}
		>
			{" "}
			{children}
		</Button>
	);
}
