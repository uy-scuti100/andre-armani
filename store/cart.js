import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
	cart: [],
	favorites: [],
};

export const useStore = create(
	persist(
		(set, get) => ({
			...initialState,
			addToCart: (product) =>
				set((state) => {
					const {
						_id,
						name,
						image,
						price,
						quantity = 1,
						selectedSize,
					} = product; // Destructure product data

					const existingItem = state.cart.find(
						(item) => item._id === _id && item.selectedSize === selectedSize
					);

					if (existingItem) {
						// Update quantity for existing item
						return {
							// cart: state.cart.map((item) =>
							// 	item.id === id && item.selectedSize === selectedSize
							// 		? { ...item, quantity: item.quantity + quantity }
							// 		: item
							// ),
						};
					} else {
						// Add new item to cart
						return {
							cart: [
								...state.cart,
								{ _id, name, image, price, quantity, selectedSize },
							],
						};
					}
				}),
			removeFromCart: (productId, selectedSize) =>
				set((state) => ({
					cart: state.cart.filter(
						(item) =>
							item._id !== productId || item.selectedSize !== selectedSize
					),
				})),

			increaseQuantity: (productId, selectedSize) =>
				set((state) => {
					const updatedCart = [...state.cart];
					const index = updatedCart.findIndex(
						(item) =>
							item._id === productId && item.selectedSize === selectedSize
					);
					if (index !== -1) {
						updatedCart[index].quantity++; // Increase quantity
					}
					return { cart: updatedCart };
				}),

			decreaseQuantity: (productId, selectedSize) =>
				set((state) => {
					const updatedCart = [...state.cart];
					const index = updatedCart.findIndex(
						(item) =>
							item._id === productId && item.selectedSize === selectedSize
					);
					if (index !== -1) {
						if (updatedCart[index].quantity > 1) {
							updatedCart[index].quantity--; // Decrease quantity if greater than 1
						} else {
							updatedCart.splice(index, 1); // Remove item if quantity is 1
						}
					}
					return { cart: updatedCart };
				}),
			removeAll: () => set({ cart: [] }),
		}),
		{
			name: "artwork-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
