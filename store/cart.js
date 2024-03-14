import { create } from "zustand";

// Initial state
const initialState = {
	cart: [],
	products: [],
	favorites: [],
};

// Zustand store
const useStore = create((set) => ({
	...initialState,

	// Actions
	addToCart: (productId) =>
		set((state) => ({
			cart: [...state.cart, productId],
		})),

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
