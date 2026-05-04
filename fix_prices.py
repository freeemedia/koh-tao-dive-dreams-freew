import os

# Fix Russian locale prices (uses spaces as thousand separator)
ru_prices = [
    ('฿11 500', 'IDR 4.500.000'), ('฿10 500', 'IDR 4.000.000'),
    ('฿4 500', 'IDR 1.750.000'), ('฿10 000', 'IDR 4.000.000'),
    ('฿41 000', 'IDR 16.000.000'), ('฿68 900', 'IDR 27.000.000'),
    ('฿19 000', 'IDR 7.500.000'), ('฿21 000', 'IDR 8.200.000'),
]
en_prices = [
    ('฿19,000', 'IDR 7,500,000'), ('฿21,000', 'IDR 8,200,000'),
]
course_prices = [
    ('฿1,900', 'IDR 750,000'), ('฿24,000', 'IDR 9,350,000'),
    ('฿18,000', 'IDR 7,000,000'), ('฿1,800', 'IDR 700,000'),
    ('฿66,800', 'IDR 26,000,000'), ('฿56,780', 'IDR 22,000,000'),
    ('฿5,678', 'IDR 2,200,000'),
]

files_to_fix = {
    'src/locales/ru.json': ru_prices,
    'src/locales/en.json': en_prices,
    'src/components/Courses.tsx': course_prices,
}

for fpath, replacements in files_to_fix.items():
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Fixed:', fpath)

# Fix AdminVouchers and FinanceSummary - replace baht symbol with IDR
for fpath in ['src/components/AdminVouchers.tsx', 'src/components/FinanceSummary.tsx',
              'src/components/BookingForm.tsx', 'src/components/InlineCourseBookingForm.tsx']:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('\u0e3f', 'IDR ')
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Fixed:', fpath)

print('ALL DONE')
