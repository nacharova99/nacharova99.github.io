def main():
    text = input("Приветствие: ")
    if "привет" in text:
        print("$100")
    elif "здравствуйте" in text:
        print("$0")
    elif "з" in text:
        print("$20")
    else:
        print("$0")