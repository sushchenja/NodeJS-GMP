process.stdin.on("data", (chunk) => {
	process.stdout.write(`${chunk.reverse().toString()}\n`);
});

process.stdout.write("Enter string to transform:\n");
