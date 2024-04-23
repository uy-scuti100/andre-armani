import products from "./schemas/product";
import order from "./schemas/order";
import orderItem from "./schemas/order-items";
import customer from "./schemas/customer";

export const schema = {
	types: [products, order, orderItem, customer],
};
