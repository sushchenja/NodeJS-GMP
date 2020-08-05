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

function writeCsvToTxtByStream(csvPath, txtPath) {
	const readCsvStream = fs.createReadStream(csvPath);
	const writeTxtStream = fs.createWriteStream(txtPath);
	readCsvStream.on("error", (err) => console.log(err));
	writeTxtStream.on("error", (err) => console.log(err));

	readCsvStream.pipe(converter).pipe(writeTxtStream);
}

async function createTxtFromCsv() {
	try {
		if (!fs.existsSync(txtDirPath)) {
			await fsPromises.mkdir(txtDirPath, { recursive: true });
		}
		writeCsvToTxtByStream(csvPath, txtPath);
	} catch (error) {
		console.log(error);
	}
}

createTxtFromCsv();
