path = 'src/pages/DiveSitesPage.tsx'
with open(path, 'r', encoding='utf-8') as f:
    src = f.read()

replacements = [
    ('pageContent.heroTitle', 'pageContent.hero_title'),
    ('pageContent.heroText', 'pageContent.hero_text'),
    ('pageContent.bookDive', 'pageContent.book_dive'),
    ('pageContent.overviewTitle', 'pageContent.overview_title'),
    ('pageContent.overviewText', 'pageContent.overview_text'),
    ('pageContent.stat1Title', 'pageContent.stat1_title'),
    ('pageContent.stat1Text', 'pageContent.stat1_text'),
    ('pageContent.stat2Title', 'pageContent.stat2_title'),
    ('pageContent.stat2Text', 'pageContent.stat2_text'),
    ('pageContent.stat3Title', 'pageContent.stat3_title'),
    ('pageContent.stat3Text', 'pageContent.stat3_text'),
    ('pageContent.stat4Title', 'pageContent.stat4_title'),
    ('pageContent.stat4Text', 'pageContent.stat4_text'),
    ('pageContent.deepTitle', 'pageContent.deep_title'),
    ('pageContent.depth}', 'pageContent.depth_label}'),
    ('pageContent.coralTitle', 'pageContent.coral_title'),
    ('pageContent.artificialTitle', 'pageContent.artificial_title'),
    ('pageContent.shallowTitle', 'pageContent.shallow_title'),
    ('pageContent.bookingTitle', 'pageContent.booking_title'),
    ('pageContent.bookingText', 'pageContent.booking_text'),
]

for old, new in replacements:
    count = src.count(old)
    src = src.replace(old, new)
    print(f'  {old} -> {new} ({count}x)')

with open(path, 'w', encoding='utf-8') as f:
    f.write(src)
print('Done')
