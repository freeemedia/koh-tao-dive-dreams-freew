filepath = 'src/pages/MarineLifePage.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    c = f.read()

# Fix the broken line 51 first - ENDMARKER followed by old content
broken = r"ENDMARKER',"
# Find the ENDMARKER line and clean it up properly
import re
# Replace the broken pelagic_species NL block
# The current state has: 'Mola Mola...|ENDMARKER' followed by old Walvishaai text then ','
# We need to find and fix that whole segment
c = re.sub(
    r"pelagic_species: 'Mola Mola.*?ENDMARKER.*?/marine-life/malabar-grouper',",
    "pelagic_species: 'Mola Mola (Maanvis)|De meest iconische bewoner van Crystal Bay. Deze massieve vissen kunnen tot 2.000 kg wegen en worden gezien op reinigingsstations op 15-30m diepte.|Tot 3m, 2000kg|Crystal Bay & SD Point|Jul-nov (piek aug-okt)|\nMantarog|Elegante planktoneters met enorme spanwijdte die spectaculaire rolbewegingen maken bij reinigingsstations.|Spanwijdte tot 7m|Manta Point, Gamat Bay|Hele jaar, piek apr-okt|\nBultkoppapegaaivis|Indrukwekkende scholen van soms 50+ exemplaren die over het rif trekken.|Tot 70cm|Toyapakeh, Mangrove Point|Hele jaar|\nBarracudaSchool|Zilverglanzende roofvissen die in grote dichte scholen jagen.|Tot 1,8m|Blue Corner, Ceningan Wall|Hele jaar|',",
    c,
    flags=re.DOTALL
)

# NL hero_text - file stores literal \u2019 escape
c = c.replace(
    r"hero_text: 'Ontdek de indrukwekkende biodiversiteit van Koh Tao\u2019s onderwaterwereld, met meer dan 350 vissoorten en bijzondere zeedieren.',",
    "hero_text: 'Ontdek de spectaculaire onderwaterwereld van Nusa Lembongan - van reusachtige Mola Mola tot mantaroggen, rifhaaien en kleurrijke koraalriffen.',"
)
# NL intro_text
c = c.replace(
    r"intro_text: 'De tropische wateren rond Koh Tao kennen een enorme rijkdom aan zeeleven en biodiversiteit. Met stabiele watertemperaturen tussen 26-29\u00b0C het hele jaar door vormt de zee een ideaal leefgebied voor diverse soorten fauna en flora. Van vriendelijke reuzen zoals walvishaaien tot kleine macrosoorten: Koh Tao biedt ontmoetingen met enkele van de meest fascinerende zeedieren ter wereld.',",
    "intro_text: 'De wateren rond Nusa Lembongan, Nusa Penida en Nusa Ceningan behoren tot de rijkste mariene gebieden van Bali. Sterke stromen brengen voedselrijk koud water omhoog, waardoor unieke ontmoetingen mogelijk zijn met Mola Mola, mantaroggen en bultkoppapegaaivissen. Watertemperaturen liggen tussen 22-28 graden C.',"
)
# NL cta_title
c = c.replace(
    r"cta_title: 'Klaar om het mari\u00ebne leven van Koh Tao te beleven?',",
    "cta_title: 'Klaar om het mariene leven van Lembongan te beleven?',"
)
# NL reef_sharks (already was correct? Let's fix)
c = c.replace(
    "reef_sharks: 'Zwartpuntrifhaai|Veelvoorkomende rifhaaien met kenmerkende zwarte vinpunten, vaak jagend in ondiep water.|Tot 2m|Koraalriffen|Hele jaar|/marine-life/black-tip-reef-shark\nGrijze rifhaai|Schuwere rifhaaien die dieper water verkiezen en minder vaak worden gezien.|Tot 2,5m|Diepe riffen|Hele jaar|',",
    "reef_sharks: 'Zwartpuntrifhaai|Veelgeziene rifhaaien met kenmerkende zwarte vinpunten bij Blue Corner en Ceningan Wall.|Tot 1,8m|Rifrand en Blue Corner|Hele jaar|\nWittiprifhaai|Slanke rifhaaien die vaak rusten op de bodem van holen en grotten.|Tot 2,1m|Diepe riffen en grotten|Hele jaar|',"
)
# NL sea_turtles
c = c.replace(
    "sea_turtles: 'Groene zeeschildpad|Plantenetende zeeschildpadden die grazen op zeegras en algen, vaak gezien in ondiepe baaien.|Tot 1,5m|Ondiepe baaien en riffen|Hele jaar|/marine-life/green-sea-turtle\nKaretschildpad|Mooie schildpadden met een kenmerkende snavelvormige bek, bekend om het eten van sponsen.|Tot 1m|Koraalriffen|Hele jaar|/marine-life/hawksbill-sea-turtle',",
    "sea_turtles: 'Groene zeeschildpad|Regelmatig gezien grazend op zeegras bij Mangrove Point en Toyapakeh.|Tot 1,5m|Ondiepe baaien en riffen|Hele jaar|/marine-life/green-sea-turtle\nKaretschildpad|Herkenbaar aan de snavelvormige bek, eet sponsen op koraalriffen.|Tot 1m|Koraalriffen|Hele jaar|/marine-life/hawksbill-sea-turtle',"
)
# NL macro_life
c = c.replace(
    "macro_life: 'Naaktslakken|Kleurrijke zeenaaktslakken met bijzondere patronen en vormen, perfect voor macrofotografie.|1-15cm|Koraalriffen|Hele jaar|/marine-life/nudibranchs\nGebandeerde zeekrait|Giftige zeeslangen die in ondiep water op vis en paling jagen.|Tot 1,5m|Ondiepe riffen|Hele jaar|/marine-life/banded-sea-krait\nBaardschorpioenvis|Meester in camouflage met giftige stekels, perfect vermomd als koraal.|Tot 30cm|Koraalriffen|Hele jaar|/marine-life/bearded-scorpion-fish\nKoppotigen|Intelligente octopussen en inktvissen, meesters in camouflage en probleemoplossing.|5cm-3m|Koraalriffen en diep water|Hele jaar|/marine-life/cephalopods',",
    "macro_life: 'Pygmee zeepaardje|Minuscuul zeepaardje van slechts 2cm dat op waaiersponzen leeft.|2cm|Waaiersponzen 15-30m|Hele jaar|\nNaaktslakken|Honderden soorten kleurrijke zeenaaktslakken op de riffen van Ceningan en Lembongan.|1-15cm|Koraalriffen|Hele jaar|/marine-life/nudibranchs\nSpookpijlvis|Zeldzame, goed gecamoufleerde verwant van het zeepaardje.|5-15cm|Zeegras en koraal|Hele jaar|\nKoppotigen|Intelligente octopussen en inktvissen die actief jagen op het rif.|5cm-1m|Koraalriffen|Hele jaar|/marine-life/cephalopods',"
)

# EN hero_text
c = c.replace(
    r"hero_text: 'Discover the impressive biodiversity of Koh Tao\u2019s underwater world, with over 350 fish species and remarkable marine animals.',",
    "hero_text: \"Discover Nusa Lembongan's spectacular underwater world - from giant Mola Mola to manta rays, reef sharks and vibrant coral reefs.\","
)
# EN intro_text
c = c.replace(
    r"intro_text: 'The tropical waters around Koh Tao are rich in marine life and biodiversity. With stable water temperatures between 26-29\u00b0C year-round, the sea is an ideal habitat for diverse fauna and flora. From gentle giants like whale sharks to tiny macro species, Koh Tao offers encounters with some of the most fascinating sea creatures in the world.',",
    "intro_text: 'The waters surrounding Nusa Lembongan, Nusa Penida and Nusa Ceningan are among the richest marine environments in Bali. Strong currents upwell cold, nutrient-rich water creating unique encounters with Mola Mola, manta rays and bumphead parrotfish. Water temperatures range from 22-28 degrees C depending on season and depth.',"
)
# EN pelagic_species
c = c.replace(
    'pelagic_species: "Whale shark|The largest fish in the world. These gentle giants are regularly spotted in deeper waters around Koh Tao, especially during plankton blooms.|Up to 12m|Deep offshore water|Year-round, peak Nov-Mar|/marine-life/whaleshark\nGreat barracuda|Impressive predators that hunt in schools around offshore pinnacles at speeds up to 40 km/h.|Up to 2m|Deep pinnacles|Year-round|/marine-life/great-barracuda\nManta rays|Elegant plankton feeders that perform spectacular looping movements while feeding.|Wingspan up to 7m|Deep water|Nov-Mar|\nMalabar grouper|Large predatory grouper living in deeper water, known for ambush hunting.|Up to 2.3m, 100kg|Deep reefs and pinnacles|Year-round|/marine-life/malabar-grouper",',
    'pelagic_species: "Mola Mola (Ocean Sunfish)|The most iconic resident of Crystal Bay. These massive fish can weigh up to 2,000 kg and are seen at cleaning stations at 15-30m depth.|Up to 3m, 2000kg|Crystal Bay & SD Point|Jul-Nov (peak Aug-Oct)|\nManta ray|Elegant plankton feeders with an enormous wingspan that perform spectacular looping rolls at cleaning stations.|Wingspan up to 7m|Manta Point, Gamat Bay|Year-round, peak Apr-Oct|\nBumphead parrotfish|Impressive schools of 50+ individuals sweeping across the reef biting coral.|Up to 70cm|Toyapakeh, Mangrove Point|Year-round|\nBarracuda school|Silver predators that hunt in large dense schools.|Up to 1.8m|Blue Corner, Ceningan Wall|Year-round|",'
)
# EN reef_sharks
c = c.replace(
    "reef_sharks: 'Blacktip reef shark|Common reef sharks with distinctive black fin tips, often hunting in shallow water.|Up to 2m|Coral reefs|Year-round|/marine-life/black-tip-reef-shark\nGrey reef shark|Shyer reef sharks that prefer deeper water and are seen less often.|Up to 2.5m|Deep reefs|Year-round|',",
    "reef_sharks: 'Blacktip reef shark|Commonly seen with distinctive black fin tips, active at Blue Corner and Ceningan Wall.|Up to 1.8m|Reef edge and Blue Corner|Year-round|\nWhitetip reef shark|Slender sharks often resting on the bottom of caves and overhangs.|Up to 2.1m|Deeper reefs and caves|Year-round|',"
)
# EN sea_turtles
c = c.replace(
    "sea_turtles: 'Green sea turtle|Herbivorous sea turtles that graze on seagrass and algae, often seen in shallow bays.|Up to 1.5m|Shallow bays and reefs|Year-round|/marine-life/green-sea-turtle\nHawksbill sea turtle|Beautiful turtles with a distinctive beak-like mouth, known for feeding on sponges.|Up to 1m|Coral reefs|Year-round|/marine-life/hawksbill-sea-turtle',",
    "sea_turtles: 'Green sea turtle|Regularly spotted grazing on seagrass and resting on the reef at Mangrove Point and Toyapakeh.|Up to 1.5m|Shallow bays and reefs|Year-round|/marine-life/green-sea-turtle\nHawksbill sea turtle|Recognisable by its beak-like mouth, feeds on sponges on coral reefs.|Up to 1m|Coral reefs|Year-round|/marine-life/hawksbill-sea-turtle',"
)
# EN macro_life
c = c.replace(
    "macro_life: 'Nudibranchs|Colorful sea slugs with unique patterns and shapes, perfect for macro photography.|1-15cm|Coral reefs|Year-round|/marine-life/nudibranchs\nBanded sea krait|Venomous sea snakes that hunt fish and eels in shallow water.|Up to 1.5m|Shallow reefs|Year-round|/marine-life/banded-sea-krait\nBearded scorpionfish|Master of camouflage with venomous spines, perfectly disguised as coral.|Up to 30cm|Coral reefs|Year-round|/marine-life/bearded-scorpion-fish\nCephalopods|Intelligent octopuses and cuttlefish, masters of camouflage and problem solving.|5cm-3m|Coral reefs and deep water|Year-round|/marine-life/cephalopods',",
    "macro_life: 'Pygmy seahorse|Tiny 2cm seahorse that lives on sea fan coral - a top find for macro photographers.|2cm|Sea fan coral 15-30m|Year-round|\nNudibranchs|Hundreds of species of colorful sea slugs on the reefs of Ceningan and Lembongan.|1-15cm|Coral reefs|Year-round|/marine-life/nudibranchs\nGhost pipefish|Rare, well-camouflaged relative of the seahorse found among seagrass.|5-15cm|Seagrass and coral|Year-round|\nCephalopods|Intelligent octopuses, cuttlefish and squid actively hunting on the reef.|5cm-1m|Coral reefs|Year-round|/marine-life/cephalopods',"
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(c)

remaining = c.count('Koh Tao')
print(f'Done. Remaining "Koh Tao": {remaining}')
