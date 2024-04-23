// customer.js
export default {
	name: "customer",
	title: "Customer",
	type: "document",
	fields: [
		{
			name: "displayName",
			title: "Display Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "id",
			title: "ID",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "displayImage",
			title: "Display Image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "email",
			title: "Email",
			type: "string",
			validation: (Rule) => Rule.required().email(),
		},
	],
};
