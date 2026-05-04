import os

patterns = [
    ('฿11,000', 'IDR 4,500,000'), ('฿11,500', 'IDR 4,500,000'),
    ('฿10,500', 'IDR 4,000,000'), ('฿10,000', 'IDR 4,000,000'),
    ('฿9,500', 'IDR 3,700,000'), ('฿9,000', 'IDR 3,500,000'),
    ('฿8,500', 'IDR 3,300,000'), ('฿6,500', 'IDR 2,500,000'),
    ('฿5,500', 'IDR 2,100,000'), ('฿5,000', 'IDR 1,950,000'),
    ('฿4,500', 'IDR 1,750,000'), ('฿3,500', 'IDR 1,350,000'),
    ('฿2,900', 'IDR 1,100,000'), ('฿2,500', 'IDR 950,000'),
    ('฿1,000', 'IDR 385,000'), ('฿900', 'IDR 345,000'),
    ('฿800', 'IDR 310,000'), ('฿41,000', 'IDR 16,000,000'),
    ('฿68,900', 'IDR 27,000,000'), ('฿25,000', 'IDR 9,750,000'),
    ('Sail Rock', 'Crystal Bay'), ('Chumphon Pinnacle', 'Manta Point'),
    ('Chumphon Pinnacles', 'Manta Point'),
    ('Japanese Gardens', 'Toyapakeh'), ('Mango Bay', 'SD Point'),
    ('HTMS Sattakut', 'USAT Liberty Wreck'), ('Twins Pinnacle', 'Ceningan Wall'),
    ('Aow Leuk', 'Blue Corner'), ('Buoyancy World', 'Mangrove Point'),
    ('Gulf of Thailand', 'Bali Sea'), ('gulf of thailand', 'Bali Sea'),
    ('Chalok Baan Kao', 'Mushroom Bay'),
    ('THB', 'IDR'),
]

for root, dirs, files in os.walk('src'):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for fname in files:
        if not (fname.endswith('.tsx') or fname.endswith('.ts') or fname.endswith('.json')):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        new_content = content
        for old, new in patterns:
            new_content = new_content.replace(old, new)
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print('Updated:', fpath)

print('ALL DONE')
