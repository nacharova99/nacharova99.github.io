def main():
    input("Введите текст: “)
    converted_text = convert(user_input)
    print(f"Конвертированный текст: {converted_text}”)

def convert(text):
    text = text.replace(':)','\U0001f642')
    text = text.replace(':(','\U0001f641')
return text

main()