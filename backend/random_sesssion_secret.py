import random
chars = [chr(i) for i in range(ord("a"),ord("z")+1)] + [chr(i) for i in range(ord("A"),ord("Z")+1)] + [chr(i) for i in range(ord("0"),ord("9")+1)] + [".","-"]
print("".join([chars[random.randint(0,len(chars)-1)] for i in range(128)]))