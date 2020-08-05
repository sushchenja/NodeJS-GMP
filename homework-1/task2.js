import csv from "csvtojson";
import fs from "fs";
import path from "path";

const txtDirPath = path.resolve(__dirname, "./txt");
const csvPath = path.resolve(__dirname, "./csv/nodejs-hw1.csv");
const txtPath = path.resolve(__dirname, "./txt/nodejs-hw1.txt");

if (fs.existsSync(txtDirPath)) {
	writeCsvToTxt(csvPath, txtPath);
} else {
	fs.mkdir(txtDirPath, { recursive: true }, (err) => {
		if (err) {
			throw err;
		}
		writeCsvToTxt(csvPath, txtPath);
	});
}

function writeCsvToTxt(csvPath, txtPath) {
	const readCsvStream = fs.createReadStream(csvPath);
	const writeTxtStream = fs.createWriteStream(txtPath);
	readCsvStream.on("error", (err) => console.log(err));
	writeTxtStream.on("error", (err) => console.log(err));

	readCsvStream
		.pipe(
			csv({
				headers: ["book", "author", "amount", "price"],
				colParser: {
					price: "number",
					amount: "omit",
				},
			})
		)
		.pipe(writeTxtStream);
}
