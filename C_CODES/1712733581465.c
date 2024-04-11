#include <stdio.h>
#include <stdlib.h>

int factorial(int n) {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: ./Factorial <number>\n");
        return 1;
    }

    int num = atoi(argv[1]);

    if (num < 0) {
        fprintf(stderr, "Number must be non-negative.\n");
        return 1;
    }

    int result = factorial(num);
    printf("Factorial of %d is: %d\n", num, result);

    return 0;
}
