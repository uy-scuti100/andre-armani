"use server";

const fs = require("fs");

export const fetchCanvasData = async () => {
	try {
		const jsonData = fs.readFileSync(
			"constants/data/framed-canvas.json",
			"utf8"
		);
		const data = JSON.parse(jsonData);
		return data.art_collection;
	} catch (error) {
		// Throw the error to indicate failure
		throw new Error("Error reading data: " + error.message);
	}
};
export const fetchPrintsData = async () => {
	try {
		const jsonData = fs.readFileSync("constants/data/paper-print.json", "utf8");
		const data = JSON.parse(jsonData);
		return data.prints_on_paper;
	} catch (error) {
		// Throw the error to indicate failure
		throw new Error("Error reading data: " + error.message);
	}
};
export const fetchWearsData = async () => {
	try {
		const jsonData = fs.readFileSync("constants/data/wears.json", "utf8");
		const data = JSON.parse(jsonData);
		return data.printed_hoodies;
	} catch (error) {
		// Throw the error to indicate failure
		throw new Error("Error reading data: " + error.message);
	}
};
