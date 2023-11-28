name = input("File name: ")
ext = name.split('.')[-1]
match ext:
    case "jpg":
        print("image/jpeg")
    case "pdf":
        print("image/jpeg")