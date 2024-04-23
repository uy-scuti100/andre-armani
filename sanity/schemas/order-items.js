export default {
	name: "orderItem",
	title: "Order Item",
	type: "object",
	fields: [
		{
			name: "product",
			title: "Product",
			type: "reference",
			to: [{ type: "products" }],
			validation: (Rule) => Rule.required(),
		},
		{
			name: "quantity",
			title: "Quantity",
			type: "number",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "size",
			title: "Size",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "color",
			title: "Color",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "price",
			title: "Price",
			type: "number",
			validation: (Rule) => Rule.required(),
		},
	],
};
