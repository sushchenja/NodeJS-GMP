import csv from "csvtojson";
import fs from "fs";
import path from "path";

const fsPromises = fs.promises;

const txtDirPath = path.resolve(__dirname, "./txt");
const csvPath = path.resolve(__dirname, "./csv/nodejs-hw1.csv");
const txtPath = path.resolve(__dirname, "./txt/nodejs-hw1.txt");

const converter = csv({
	headers: ["book", "author", "amount", "price"],
	colParser: {
		price: "number",
		amount: "omit",
	},
});

async function writeCsvToTxt(csvPath, txtPath) {
	try {
		const csvData = await converter.fromFile(csvPath);
		const resultText = csvData.reduce((acc, item) => {
			return `${acc}${JSON.stringify(item)}\n`;
		}, "");
		await fsPromises.writeFile(txtPath, resultText);
	} catch (error) {
		console.log(error);
	}
}

async function createTxtFromCsv() {
	try {
		if (!fs.existsSync(txtDirPath)) {
			await fsPromises.mkdir(txtDirPath, { recursive: true });
		}
		writeCsvToTxt(csvPath, txtPath);
	} catch (error) {
		console.log(error);
	}
}

createTxtFromCsv();
