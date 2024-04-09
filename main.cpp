#include <iostream>
#include <cstring>

bool isPalindrome(const char* str) {
    int len = std::strlen(str);
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - i - 1]) {
            return false;
        }
    }
    return true;
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <string>" << std::endl;
        return 1;
    }

    const char* inputStr = argv[1];

    if (isPalindrome(inputStr)) {
        std::cout << '"' << inputStr << '"' << " is a palindrome." << std::endl;
    } else {
        std::cout << '"' << inputStr << '"' << " is not a palindrome." << std::endl;
    }

    return 0;
}