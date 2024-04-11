#include <stdio.h>

int factorial(int number) {
// Write your code here
}

int main() {
    // Test case values for num: 5, 3, and 7
    int testCases[] = {5, 3, 7};
    for (int i = 0; i < sizeof(testCases) / sizeof(testCases[0]); i++) {
        int num = testCases[i];
        printf("Factorial of %d is %d
", num, factorial(num));
    }
    return 0;
}