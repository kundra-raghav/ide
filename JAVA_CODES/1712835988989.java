public class Main {
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        if (args.length != 2) {
            System.err.println("Usage: java AddNumbers <num1> <num2>");
            System.exit(1);
        }

        int num1 = Integer.parseInt(args[0]);
        int num2 = Integer.parseInt(args[1]);

        System.out.println(add(num1,num2));
}
}