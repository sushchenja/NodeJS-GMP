process.stdin.setEncoding("utf-8");

process.stdin.on("readable", () => {
	let chunk;
	while (null !== (chunk = process.stdin.read())) {
		process.stdout.write(`${reverseInputText(chunk)}\n`);
	}
});
process.stdout.write("Enter string to transform:\n");

const reverseInputText = (text) => text.split("").reverse().join("");
