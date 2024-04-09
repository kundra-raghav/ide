public class Main {
    public static int factorial(int n) {
        if (n <= 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }

    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Usage: java Factorial <number>");
            System.exit(1);
        }

        int num = Integer.parseInt(args[0]);

        if (num < 0) {
            System.err.println("Number must be non-negative.");
            System.exit(1);
        }

        int result = factorial(num);
        System.out.println("Factorial of " + num + " is: " + result);
    }
}