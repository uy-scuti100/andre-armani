import { create } from "zustand";

// Initial state
const initialState = {
	cart: [],
	favorites: [],
};

// Zustand store
const useStore = create((set) => ({
	...initialState,

	// Actions
	addToCart: (productId, selectedSize = undefined) =>
		set((state) => {
			const existingItem = state.cart.find(
				(item) => item.productId === productId && item.size === selectedSize
			);

			if (existingItem) {
				// If the same product with the same size already exists, increase its quantity
				return {
					cart: state.cart.map((item) =>
						item.productId === productId && item.size === selectedSize
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				};
			} else {
				// Otherwise, add a new cart item with the selected size (or default size)
				const size = selectedSize || state.defaultSize(productId); // Use selected size or default
				return {
					cart: [...state.cart, { productId, size, quantity: 1 }],
				};
			}
		}),

	removeFromCart: (productId) =>
		set((state) => ({
			cart: state.cart.filter((id) => id !== productId),
		})),

	addToFavorites: (productId) =>
		set((state) => ({
			favorites: [...state.favorites, productId],
		})),

	removeFromFavorites: (productId) =>
		set((state) => ({
			favorites: state.favorites.filter((id) => id !== productId),
		})),

	increaseQuantity: (productId) =>
		set((state) => {
			const updatedCart = [...state.cart];
			const index = updatedCart.findIndex((id) => id === productId);
			if (index !== -1) {
				updatedCart.splice(index, 1, productId);
			}
			return { cart: updatedCart };
		}),

	decreaseQuantity: (productId) =>
		set((state) => {
			const updatedCart = [...state.cart];
			const index = updatedCart.findIndex((id) => id === productId);
			if (index !== -1) {
				updatedCart.splice(index, 1);
			}
			return { cart: updatedCart };
		}),

	getTotalQuantityInCart: () => {
		return state.cart.length;
	},
}));

export default useStore;
