def convert(text):
    text = text.replace(':)','\U0001f642')
    text = text.replace(':(','\U0001f641')
    return text

def main():
    user_input = input("Введите текст: ")
    result = convert(user_input)
    print("Результат:",result)

if _name_ == "_main_":

main()