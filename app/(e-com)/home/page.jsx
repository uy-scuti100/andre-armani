import Herosection from "./(homepage-components)/hero-section";
import Showcase from "./(homepage-components)/showcase";
import Featureproduct from "./(homepage-components)/feature-product";
export default function Home() {
	return (
		<main className="pt-[3.438rem]">
			<Herosection />
			<Showcase />
			<Featureproduct />
		</main>
	);
}
