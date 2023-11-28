text = input("Приветствие: ")
if text.startswith("привет"):
    print("$100")
if text.startswith("здравствуйте"):
    print("$0")
if text.startswith ("з"):
    print("$20")
else:
    print("$0")
