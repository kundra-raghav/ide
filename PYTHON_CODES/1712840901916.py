import sys

def add(a, b):
    return a + b

if len(sys.argv) != 3:
    sys.stderr.write("Usage: {} <num1> <num2>\n".format(sys.argv[0]))
    sys.exit(1)

num1 = int(sys.argv[1])
num2 = int(sys.argv[2])

print(add(num1, num2))
