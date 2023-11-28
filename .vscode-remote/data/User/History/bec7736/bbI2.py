camelName = input("Верблюжий стиль: ")
nameN = ""
for c in camelName:
    if c.islower():
        nameN = nameN + c
    else:
        nameN = nameN + "_