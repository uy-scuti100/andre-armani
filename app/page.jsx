import { fetchImages } from "@/actions/fetchings";
import Herosection from "@/components/(homepage-components)/hero-section";
import Showcase from "@/components/(homepage-components)/showcase";
import Featureproduct from "@/components/(homepage-components)/feature-product";

export default async function Home() {
	// const imagesWithBase64 = await fetchImages();
	// const data = await fetchImages();
	return (
		<main>
			<Herosection />
			<Showcase />
			<Featureproduct />
		</main>
	);
}
