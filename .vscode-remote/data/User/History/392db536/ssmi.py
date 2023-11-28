def convert(text):
    text = text.replace(':)','\U0001f642')
    text = text.replace(':(','\U0001f641')
    return text

def main():
    user_input = input()
    converted_text = convert(user_input)
    print(converted_text)

if _name_ == "_main_":

main()