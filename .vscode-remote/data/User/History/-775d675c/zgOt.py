def main():
while True:
    try:
        fuel_fraction = input("Дробь: ")
fuel_fraction = fuel_fraction.strip()
x, y = fuel_fraction.split('/')
x = int(x)
y = int(y)

if x == 0 or y == 0:
raise ValueError

if y == 0 or x > y:
print("Введите дробь в формате 'x/y', где x, y - целые числа")
continue

percent_fuel = x * 100 / y
if percent_fuel >= 1 and percent_fuel <= 99:
print(f"{percent_fuel}%")
elif percent_fuel < 1:
print('E (empty)')
else:
print('F (full)')
except (ValueError, ZeroDivisionError):
print("Дробные числа должны быть целыми числами")
if name == "main":
main()