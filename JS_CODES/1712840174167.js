const factorial = (n) => {
  if (n <= 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

const main = () => {
  const args = process.argv.slice(2);

  if (args.length !== 1 || isNaN(parseInt(args[0]))) {
    console.error('Usage: node Factorial.js <number>');
    process.exit(1);
  }

  const num = parseInt(args[0]);

  if (num < 0) {
    console.error('Number must be non-negative.');
    process.exit(1);
  }

  const result = factorial(num);
  console.log(`Factorial of ${num} is: ${result}`);
};

main();