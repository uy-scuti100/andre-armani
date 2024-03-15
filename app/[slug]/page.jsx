import { fetchProducts, fetchSingleProduct } from "../../actions/fetchings";
import ProductInfo from "./components/product-info";
import RelatedProductsInfo from "./components/related-products-info";

export default async function page({ params }) {
	const { slug } = params;
	const product = await fetchSingleProduct(slug);
	const products = await fetchProducts();

	const relatedProducts = [];
	if (products && products) {
		for (let i = 0; i < products.length; i++) {
			const relatedProd = products[i];
			if (relatedProd.type === product.type) {
				relatedProducts.push(relatedProd);
			}
		}
	}

	// console.log(relatedProducts);

	return (
		<section className="pt-[6.438rem] px-[0.63rem]">
			<ProductInfo info={product} />
			<RelatedProductsInfo relatedProducts={relatedProducts} />
		</section>
	);
}
