import Herosection from "../../components/(homepage-components)/hero-section";
import Showcase from "../../components/(homepage-components)/showcase";
import Featureproduct from "../../components/(homepage-components)/feature-product";
export default function Home() {
	return (
		<main className="pt-[3.438rem]">
			<Herosection />
			<Showcase />
			<Featureproduct />
		</main>
	);
}
