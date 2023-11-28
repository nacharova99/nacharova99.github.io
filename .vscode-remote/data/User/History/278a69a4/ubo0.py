"""Если в шапке вставляю coin = input("Вставьте монету: "), то повторяет ввод нужной суммы"""
def main():
    amount_due = 50
    print(f"Нужная сумма: {amount_due}")
    pay(amount_due)
def pay(change_owed):
    coins = [50,20,10,5]
    while change_owed