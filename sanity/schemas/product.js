export default {
	name: "products",
	title: "Products",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Product Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		},

		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: (doc) => `${doc.name}-${Math.floor(Math.random() * 10000)}`, // Generate slug with random number
				maxLength: 96,
				// isUnique: true,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: "price",
			title: "Price",
			type: "number",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "type",
			title: "Product Type",
			type: "string", // Replace with "string" if type is not a defined category
			options: {
				list: [
					{ title: "Printed Hoodies", value: "printed_hoodies" },
					{ title: "Framed Canvas", value: "framed-canvas" },
					{ title: "Printed Papers", value: "printed-paper" },
				],
			},
		},
		{
			name: "images",
			title: "Product Images",
			type: "array",
			of: [{ type: "image" }],
		},
		{
			name: "sizes",
			title: "Available Sizes",
			type: "array",
			of: [{ type: "string" }],
		},
		{
			name: "description",
			title: "Product Description",
			type: "text",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "soldOut",
			title: "Sold Out",
			type: "boolean",
			initialValue: false, // Set initial value to false (not sold out)
		},
	],
};
