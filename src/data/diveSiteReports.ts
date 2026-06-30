export type DiverRole = 'Dive Pro' | 'Fun Diver';

export type DiveSiteReport = {
  id: string;
  site: string;
  region: string;
  submittedBy: string;
  role: DiverRole;
  date: string;
  visibilityM: number;
  current: 1 | 2 | 3 | 4 | 5;
  waves: 1 | 2 | 3 | 4 | 5;
  temperatureC: number;
  sightings: string[];
  notes: string;
};

export type DiveTrip = {
  id: string;
  shopName: string;
  tripDate: string;
  departure: string;
  site: string;
  seatsLeft: number;
  contact: string;
};

export const regions = ['Koh Tao', 'Koh Phangan', 'Gili Islands', 'Nusa Penida', 'Okinawa'] as const;

export const diveSitesByRegion: Record<string, string[]> = {
  'Koh Tao': ['Sail Rock', 'Chumphon Pinnacle', 'South West Pinnacle', 'Shark Island', 'HTMS Sattakut'],
  'Koh Phangan': ['Sail Rock East', 'Mae Haad Reef', 'Koh Ma'],
  'Gili Islands': ['Shark Point Gili', 'Turtle Heaven', 'Manta Slope'],
  'Nusa Penida': ['Manta Point', 'Crystal Bay', 'Toyapakeh Wall'],
  Okinawa: ['Blue Cave', 'Manza Dream Hole', 'Kerama Coral Garden'],
};

export const speciesBySite: Record<string, string[]> = {
  'Sail Rock': ['Whale shark', 'Chevron barracuda', 'Batfish', 'Trevally'],
  'Chumphon Pinnacle': ['Whale shark', 'Giant grouper', 'Snappers', 'Cobia'],
  'South West Pinnacle': ['Spanish mackerel', 'Barracuda', 'Eagle ray', 'Fusiliers'],
  'Shark Island': ['Blacktip reef shark', 'Blue-spotted stingray', 'Nudibranch', 'Pufferfish'],
  'HTMS Sattakut': ['Lionfish', 'Groupers', 'Banners', 'Scorpionfish'],
  'Manta Point': ['Manta ray', 'Moorish idol', 'Reef shark', 'Octopus'],
  'Blue Cave': ['Clownfish', 'Butterflyfish', 'Moray eel', 'Cleaner shrimp'],
};

export const starterReports: DiveSiteReport[] = [
  {
    id: 'r1',
    site: 'Sail Rock',
    region: 'Koh Tao',
    submittedBy: 'A. Dehnke',
    role: 'Dive Pro',
    date: '2026-04-29',
    visibilityM: 18,
    current: 3,
    waves: 2,
    temperatureC: 29,
    sightings: ['Whale shark', 'Trevally school', 'Giant barracuda'],
    notes: 'Strong life at the chimney, mild surge on ascent.',
  },
  {
    id: 'r2',
    site: 'Chumphon Pinnacle',
    region: 'Koh Tao',
    submittedBy: 'Nina',
    role: 'Fun Diver',
    date: '2026-04-30',
    visibilityM: 14,
    current: 4,
    waves: 3,
    temperatureC: 28,
    sightings: ['Barracuda', 'Batfish', 'Snapper cloud'],
    notes: 'Current picked up at 22m, very fishy dive.',
  },
  {
    id: 'r3',
    site: 'Manta Point',
    region: 'Nusa Penida',
    submittedBy: 'Ocean Link',
    role: 'Dive Pro',
    date: '2026-04-28',
    visibilityM: 20,
    current: 2,
    waves: 2,
    temperatureC: 24,
    sightings: ['Manta ray', 'Turtle', 'Reef shark'],
    notes: 'Two mantas stayed for cleaning station passes.',
  },
  {
    id: 'r4',
    site: 'Blue Cave',
    region: 'Okinawa',
    submittedBy: 'Hiro',
    role: 'Fun Diver',
    date: '2026-04-27',
    visibilityM: 22,
    current: 1,
    waves: 1,
    temperatureC: 23,
    sightings: ['Clownfish', 'Moray eel', 'Damselfish'],
    notes: 'Calm conditions and excellent light penetration.',
  },
];

export const starterTrips: DiveTrip[] = [
  {
    id: 't1',
    shopName: 'Pro Diving Asia',
    tripDate: '2026-05-02',
    departure: '07:00',
    site: 'Sail Rock',
    seatsLeft: 4,
    contact: 'contact@divinginasia.com',
  },
  {
    id: 't2',
    shopName: 'Koh Tao Ocean School',
    tripDate: '2026-05-03',
    departure: '08:30',
    site: 'Chumphon Pinnacle',
    seatsLeft: 2,
    contact: 'bookings@ktocean.example',
  },
  {
    id: 't3',
    shopName: 'Penida Bluewater',
    tripDate: '2026-05-04',
    departure: '06:45',
    site: 'Manta Point',
    seatsLeft: 6,
    contact: 'hello@penidabluewater.example',
  },
];
