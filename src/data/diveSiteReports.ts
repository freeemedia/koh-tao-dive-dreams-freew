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

export const regions = ['Nusa Lembongan', 'Nusa Penida', 'Nusa Ceningan'] as const;

export const diveSitesByRegion: Record<string, string[]> = {
  'Nusa Lembongan': ['Mangrove Point', 'Jackfish Point', 'Playground', 'Sunset', 'Scooter'],
  'Nusa Penida': ['Crystal Bay', 'Manta Point', 'Gamat Bay', 'SD Point', 'Buyuk'],
  'Nusa Ceningan': ['Ceningan Wall', 'Blue Corner', 'Toyapakeh', 'Batu Melawang'],
};

export const speciesBySite: Record<string, string[]> = {
  'Crystal Bay': ['Mola Mola (Oceanic Sunfish)', 'Bumphead parrotfish', 'Reef shark', 'Turtle'],
  'Manta Point': ['Manta ray', 'Eagle ray', 'Reef shark', 'Moorish idol'],
  'Toyapakeh': ['Pygmy seahorse', 'Giant trevally', 'Bumphead parrotfish', 'Napoleon wrasse'],
  'Blue Corner': ['Blacktip reef shark', 'Barracuda school', 'Fusiliers', 'Eagle ray'],
  'Ceningan Wall': ['Sea fan coral', 'Ghost pipefish', 'Nudibranch', 'Scorpionfish'],
  'Mangrove Point': ['Bumphead parrotfish', 'Turtle', 'Sweetlips', 'Garden eel'],
  'SD Point': ['Mola Mola', 'Manta ray', 'Hammerhead shark', 'Tuna'],
};

export const starterReports: DiveSiteReport[] = [
  {
    id: 'r1',
    site: 'Crystal Bay',
    region: 'Nusa Penida',
    submittedBy: 'Vivian',
    role: 'Dive Pro',
    date: '2026-05-03',
    visibilityM: 22,
    current: 3,
    waves: 2,
    temperatureC: 24,
    sightings: ['Mola Mola', 'Bumphead parrotfish', 'Reef shark'],
    notes: 'Mola Mola at 22m for 8 minutes, incredible encounter. Thermocline at 18m.',
  },
  {
    id: 'r2',
    site: 'Manta Point',
    region: 'Nusa Penida',
    submittedBy: 'Marco D.',
    role: 'Dive Pro',
    date: '2026-05-02',
    visibilityM: 18,
    current: 2,
    waves: 2,
    temperatureC: 26,
    sightings: ['Manta ray x4', 'Eagle ray', 'Turtle'],
    notes: 'Four mantas at the cleaning station, two juveniles. Mild current, easy dive.',
  },
  {
    id: 'r3',
    site: 'Toyapakeh',
    region: 'Nusa Ceningan',
    submittedBy: 'Sara T.',
    role: 'Fun Diver',
    date: '2026-05-01',
    visibilityM: 16,
    current: 3,
    waves: 2,
    temperatureC: 27,
    sightings: ['Bumphead parrotfish', 'Napoleon wrasse', 'Pygmy seahorse'],
    notes: 'Bumphead school of 30+ fish at the wall. Guide found pygmy seahorse at 18m.',
  },
  {
    id: 'r4',
    site: 'Blue Corner',
    region: 'Nusa Ceningan',
    submittedBy: 'Alex R.',
    role: 'Fun Diver',
    date: '2026-04-30',
    visibilityM: 20,
    current: 4,
    waves: 3,
    temperatureC: 26,
    sightings: ['Blacktip reef shark', 'Barracuda school', 'Eagle ray'],
    notes: 'Strong current but incredible drift. Blacktip cruising just below us for 5 mins.',
  },
  {
    id: 'r5',
    site: 'Mangrove Point',
    region: 'Nusa Lembongan',
    submittedBy: 'Rudi W.',
    role: 'Fun Diver',
    date: '2026-04-29',
    visibilityM: 12,
    current: 2,
    waves: 1,
    temperatureC: 28,
    sightings: ['Turtle', 'Sweetlips', 'Garden eel', 'Pufferfish'],
    notes: 'Calm and relaxing dive, great for beginners. Two turtles feeding on the sand.',
  },
];

export const starterTrips: DiveTrip[] = [
  {
    id: 't1',
    shopName: 'Lembongan Dive Resort',
    tripDate: '2026-05-05',
    departure: '07:00',
    site: 'Crystal Bay',
    seatsLeft: 4,
    contact: 'dive@lembongandiveresort.com',
  },
  {
    id: 't2',
    shopName: 'Lembongan Dive Resort',
    tripDate: '2026-05-06',
    departure: '06:45',
    site: 'Manta Point',
    seatsLeft: 6,
    contact: 'dive@lembongandiveresort.com',
  },
  {
    id: 't3',
    shopName: 'Lembongan Dive Resort',
    tripDate: '2026-05-07',
    departure: '07:30',
    site: 'Toyapakeh',
    seatsLeft: 3,
    contact: 'dive@lembongandiveresort.com',
  },
];
