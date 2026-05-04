import os

baht_to_idr = {
    '฿8,000': 'IDR 3,100,000', '฿8.000': 'IDR 3,100,000',
    '฿4,200': 'IDR 1,650,000', '฿3,000': 'IDR 1,150,000',
    '฿2,200': 'IDR 850,000', '฿5,900': 'IDR 2,300,000',
    '฿6,000': 'IDR 2,300,000', '฿18,000': 'IDR 7,000,000',
    '฿24,000': 'IDR 9,350,000', '฿1.000': 'IDR 385,000',
    '฿2.900': 'IDR 1,100,000',
}

for root, dirs, files in os.walk('src'):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for fname in files:
        if not (fname.endswith('.tsx') or fname.endswith('.ts')):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        new_content = content
        for old, new in baht_to_idr.items():
            new_content = new_content.replace(old, new)
        new_content = new_content.replace('\u0e3f{', 'IDR {')
        new_content = new_content.replace('\u0e3f`', 'IDR ')
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print('Fixed:', fpath)

print('DONE')
