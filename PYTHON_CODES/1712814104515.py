import sys

# Define the factorial function

def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)


def main():
    if len(sys.argv) != 2:
        sys.stderr.write('Usage: python Factorial.py <number>\n')
        sys.exit(1)

    num = int(sys.argv[1])

    if num < 0:
        sys.stderr.write('Number must be non-negative.\n')
        sys.exit(1)

    result = factorial(num)
    print(f'Factorial of {num} is: {result}')

if __name__ == '__main__':
    main()
