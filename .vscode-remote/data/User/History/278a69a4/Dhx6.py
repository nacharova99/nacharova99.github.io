"""Если в шапке вставляю coin = input("Вставьте монету: "), то повторяет ввод нужной суммы"""
def main():
    amount_due = 50
    print(f"Нужная сумма: {amount_due}")
    pay(amount_due)
def pay(change_owed):
    coins = [50,20,10,5]
    while change_owed > 0:
        coin = int(input("Вставьте монету:").strip())
        if coin not in coins:
            continue
        elif coin in coins:
            change_owed = process(coin, change_owed)
def process(coin, change_owed):
    change_owed = change_owed - coin
    if change_owed <= 0:
        print(f"Ваша сдача: {abs(change_owed)}")
    if change_owed > 0 :
        print(f"Нужная сумма: {change_owed}")
    return change_owed
main()