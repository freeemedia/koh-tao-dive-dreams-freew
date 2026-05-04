import os

files_to_fix = [
    'src/hooks/useCurrency.tsx',
    'src/pages/Instructor.tsx',
    'src/pages/SpecialtyDetail.tsx',
    'src/pages/BookingFormPage.tsx',
    'src/pages/Admin.tsx',
    'src/pages/internship/Divemaster.nl.tsx',
    'src/pages/internship/Divemaster.en.tsx',
    'src/pages/internship/Instructor.en.tsx',
    'src/pages/internship/Instructor.nl.tsx',
    'src/pages/specialty/CoralWatch.nl.tsx',
    'src/pages/specialty/CoralWatch.en.tsx',
    'src/pages/specialty/AdaptiveSupportDiver.nl.tsx',
    'src/pages/specialty/AdaptiveSupportDiver.en.tsx',
]

specific = {
    '฿2,300': 'IDR 890,000',
    '฿4,000': 'IDR 1,550,000',
    '฿129,500': 'IDR 50,500,000',
    '฿79,500': 'IDR 31,000,000',
    '฿59,500': 'IDR 23,200,000',
    "currency === 'IDR' ? '฿'": "currency === 'IDR' ? 'Rp'",
}

for fpath in files_to_fix:
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in specific.items():
        content = content.replace(old, new)
    # Replace dynamic baht expressions
    content = content.replace('\u0e3f${', 'IDR ${')
    content = content.replace('formatThb', 'formatIdr')
    content = content.replace("'฿'", "'IDR '")
    content = content.replace('`฿', '`IDR ')
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Fixed:', fpath)

print('DONE')
