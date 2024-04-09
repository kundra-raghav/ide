// Get the command-line arguments
const args = process.argv.slice(2);

// Check if the correct number of arguments is provided
if (args.length !== 2) {
    console.error('Usage: node filename.js <num1> <num2>');
    process.exit(1); // Exit the process with a non-zero code
}

// Extract the numbers from command-line arguments
const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

// Check if the arguments are valid numbers
if (isNaN(num1) || isNaN(num2)) {
    console.error('Invalid arguments: <num1> and <num2> must be valid numbers.');
    process.exit(1); // Exit the process with a non-zero code
}

// Calculate the sum and print the result
const sum = num1 + num2;
console.log(`Sum of ${num1} and ${num2} is: ${sum}`);
