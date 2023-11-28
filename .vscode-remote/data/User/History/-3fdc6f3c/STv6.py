def main():
    v = feet2meter(input("Сколько футов:"))
    print(f"Это будет {v:.2f} метров.")

def feet2meter(v):
    x = float (v.removesuffix("ft"))
    res = x * 0.3048
    return res

main()