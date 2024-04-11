import sys

def add(a, b):
    return a + b

def main():
    if len(sys.argv) != 3:
        print("Usage:", sys.argv[0], "<num1> <num2>")
        return 1

    num1 = int(sys.argv[1])
    num2 = int(sys.argv[2])

    print("Sum:", add(num1, num2))
    return 0

if __name__ == "__main__":
    sys.exit(main())
