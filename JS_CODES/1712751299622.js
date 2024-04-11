function add(a, b) {
    return a + b;
}

function main() {
    const args = process.argv.slice(2); // Get command-line arguments excluding 'node' and script name

    if (args.length !== 2 || isNaN(args[0]) || isNaN(args[1])) {
        console.error("Usage: node script_name.js <num1> <num2>");
        process.exit(1);
    }

    const num1 = parseInt(args[0]);
    const num2 = parseInt(args[1]);

    console.log("Sum:", add(num1, num2));
}

main();
