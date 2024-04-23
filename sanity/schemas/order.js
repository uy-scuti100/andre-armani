export default {
	name: "order",
	title: "Order",
	type: "document",
	fields: [
		{
			name: "customer",
			title: "Customer",
			type: "reference",
			to: [{ type: "customer" }],
			validation: (Rule) => Rule.required(),
		},
		{
			name: "orderItems",
			title: "Order Items",
			type: "array",
			of: [{ type: "orderItem" }],
			validation: (Rule) => Rule.required(),
		},
		{
			name: "totalPrice",
			title: "Total Price",
			type: "number",
			validation: (Rule) => Rule.required(),
		},
	],
};
