import { useMemo, useState } from 'react';
import { BarChart3, Filter, Fish, MapPinned, Send } from 'lucide-react';
import {
  diveSitesByRegion,
  regions,
  speciesBySite,
  starterReports,
  starterTrips,
  type DiverRole,
  type DiveSiteReport,
} from '@/data/diveSiteReports';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const STORAGE_KEY = 'dive-site-reports-v1';

const roleBadge = (role: DiverRole) =>
  role === 'Dive Pro' ? 'bg-sky-100 text-sky-900 border-sky-200' : 'bg-emerald-100 text-emerald-900 border-emerald-200';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const loadStoredReports = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return starterReports;

    const parsed = JSON.parse(raw) as DiveSiteReport[];
    if (!Array.isArray(parsed)) return starterReports;

    return parsed;
  } catch {
    return starterReports;
  }
};

const DiveSiteReports = () => {
  const [reports, setReports] = useState<DiveSiteReport[]>(loadStoredReports);
  const [roleFilter, setRoleFilter] = useState<'All' | DiverRole>('All');
  const [regionFilter, setRegionFilter] = useState<string>('All regions');

  const [formRegion, setFormRegion] = useState<string>('Nusa Lembongan');
  const [formSite, setFormSite] = useState<string>(diveSitesByRegion['Nusa Lembongan'][0]);
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<DiverRole>('Fun Diver');
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));
  const [formVisibility, setFormVisibility] = useState('15');
  const [formCurrent, setFormCurrent] = useState('2');
  const [formWaves, setFormWaves] = useState('2');
  const [formTemp, setFormTemp] = useState('28');
  const [formSightings, setFormSightings] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const filteredReports = useMemo(() => {
    return reports
      .filter((report) => (roleFilter === 'All' ? true : report.role === roleFilter))
      .filter((report) => (regionFilter === 'All regions' ? true : report.region === regionFilter))
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  }, [reports, roleFilter, regionFilter]);

  const chartData = useMemo(() => {
    const grouped = new Map<string, { visibilitySum: number; count: number }>();

    filteredReports.forEach((report) => {
      const prev = grouped.get(report.date) ?? { visibilitySum: 0, count: 0 };
      grouped.set(report.date, {
        visibilitySum: prev.visibilitySum + report.visibilityM,
        count: prev.count + 1,
      });
    });

    return [...grouped.entries()]
      .map(([date, data]) => ({
        date,
        avgVisibility: Number((data.visibilitySum / data.count).toFixed(1)),
      }))
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .slice(-10);
  }, [filteredReports]);

  const featureSpecies = useMemo(() => {
    return Object.entries(speciesBySite)
      .slice(0, 6)
      .map(([site, species]) => ({ site, species }));
  }, []);

  const saveReports = (next: DiveSiteReport[]) => {
    setReports(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextReport: DiveSiteReport = {
      id: String(Date.now()),
      site: formSite,
      region: formRegion,
      submittedBy: formName.trim() || 'Anonymous Diver',
      role: formRole,
      date: formDate,
      visibilityM: Number(formVisibility),
      current: Number(formCurrent) as 1 | 2 | 3 | 4 | 5,
      waves: Number(formWaves) as 1 | 2 | 3 | 4 | 5,
      temperatureC: Number(formTemp),
      sightings: formSightings
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean),
      notes: formNotes.trim(),
    };

    saveReports([nextReport, ...reports]);
    setFormSightings('');
    setFormNotes('');
    setFormName('');
    setFormRole('Fun Diver');
    setFormDate(new Date().toISOString().slice(0, 10));
  };

  const onRegionChange = (region: string) => {
    setFormRegion(region);
    setFormSite(diveSitesByRegion[region][0]);
  };

  return (
    <div className="min-h-screen bg-[#f0fafa]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-cyan-400 to-emerald-400 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-60" />
        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-8 h-0.5 bg-white/60 rounded" />
            <p className="uppercase tracking-[0.25em] text-white/80 text-xs font-semibold">Live Dive Intelligence</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black max-w-4xl leading-[1.05] mb-5 drop-shadow-sm">
            Dive Conditions<br />
            <span className="text-white/70">Nusa Lembongan</span>
          </h1>
          <p className="text-white/90 max-w-2xl text-lg leading-relaxed">
            Real reports from Dive Pros and Fun Divers across Lembongan, Penida &amp; Ceningan — visibility, current, sightings and more.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {['🐠 Crystal Bay · Manta Point · Toyapakeh', '📋 Submit your own report', '📈 Live visibility trends'].map(label => (
              <span key={label} className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm px-4 py-1.5 rounded-full font-medium">
                {label}
              </span>
            ))}
          </div>
        </div>
        {/* wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 28C840 36 960 40 1080 38C1200 36 1320 28 1380 24L1440 20V60H0Z" fill="#f0fafa"/>
          </svg>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[1.6fr_1fr] gap-6">
        {/* Live Reports */}
        <div className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-400 px-6 py-4 flex items-center gap-3">
            <Filter className="h-5 w-5 text-white" />
            <h2 className="text-white font-bold text-xl">Live Reports</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="roleFilter" className="text-teal-800 font-semibold text-xs uppercase tracking-wide">Who submitted</Label>
                <select
                  id="roleFilter"
                  title="Filter by diver role"
                  className="mt-2 w-full border border-teal-200 rounded-xl h-10 px-3 bg-teal-50 text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value as 'All' | DiverRole)}
                >
                  <option value="All">All divers</option>
                  <option value="Dive Pro">Dive Pros only</option>
                  <option value="Fun Diver">Fun Divers only</option>
                </select>
              </div>
              <div>
                <Label htmlFor="regionFilter" className="text-teal-800 font-semibold text-xs uppercase tracking-wide">Region</Label>
                <select
                  id="regionFilter"
                  title="Filter by region"
                  className="mt-2 w-full border border-teal-200 rounded-xl h-10 px-3 bg-teal-50 text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={regionFilter}
                  onChange={(event) => setRegionFilter(event.target.value)}
                >
                  <option value="All regions">All regions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {filteredReports.map((report) => (
                <article key={report.id} className="rounded-xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/40 p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-teal-900 text-lg">{report.site}</h3>
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">{report.region}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${roleBadge(report.role)}`}>{report.role}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Submitted by <span className="font-semibold text-slate-700">{report.submittedBy}</span> · {formatDate(report.date)}
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-xs mb-3">
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-2 text-center">
                      <div className="font-bold text-cyan-700 text-base">{report.visibilityM}m</div>
                      <div className="text-cyan-500">visibility</div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-center">
                      <div className="font-bold text-orange-600 text-base">{report.current}/5</div>
                      <div className="text-orange-400">current</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                      <div className="font-bold text-blue-600 text-base">{report.waves}/5</div>
                      <div className="text-blue-400">waves</div>
                    </div>
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-2 text-center">
                      <div className="font-bold text-rose-600 text-base">{report.temperatureC}°</div>
                      <div className="text-rose-400">temp °C</div>
                    </div>
                  </div>
                  {report.sightings.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {report.sightings.map(s => (
                        <span key={s} className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full">🐠 {s}</span>
                      ))}
                    </div>
                  )}
                  {report.notes && <p className="text-sm text-slate-600 italic mt-1">"{report.notes}"</p>}
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-400 px-5 py-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-white" />
              <h2 className="text-white font-bold">Visibility Trend</h2>
            </div>
            <div className="p-4 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0f2f1" />
                  <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} tick={{ fontSize: 11, fill: '#0f766e' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#0f766e' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #99f6e4', fontSize: 12 }} />
                  <Line type="monotone" dataKey="avgVisibility" stroke="#0d9488" strokeWidth={2.5} dot={{ fill: '#0d9488', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Species */}
          <div className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-3 flex items-center gap-2">
              <Fish className="h-4 w-4 text-white" />
              <h2 className="text-white font-bold">Species by Site</h2>
            </div>
            <div className="p-4 space-y-3">
              {featureSpecies.map((item) => (
                <div key={item.site} className="rounded-xl bg-emerald-50/60 border border-emerald-100 p-3">
                  <p className="font-bold text-emerald-800 text-sm mb-1">{item.site}</p>
                  <p className="text-xs text-emerald-700">{item.species.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUBMIT + TRIPS */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-6">
        {/* Submit form */}
        <div className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden">
          <div className="bg-gradient-to-r from-coral-500 to-orange-400 px-6 py-4 flex items-center gap-3" style={{background: 'linear-gradient(to right, #f97316, #fb923c)'}}>
            <Send className="h-5 w-5 text-white" />
            <h2 className="text-white font-bold text-xl">Submit a Dive Report</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500 mb-5">Open to all divers — share your conditions and sightings with the community.</p>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Your name</Label>
                  <Input id="name" value={formName} onChange={(event) => setFormName(event.target.value)} placeholder="Optional" className="mt-1 rounded-xl border-teal-200 focus:ring-teal-400" />
                </div>
                <div>
                  <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Diver type</Label>
                  <select
                    id="role"
                    title="Select your diver role"
                    className="mt-1 w-full border border-teal-200 rounded-xl h-10 px-3 bg-teal-50 text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    value={formRole}
                    onChange={(event) => setFormRole(event.target.value as DiverRole)}
                  >
                    <option value="Fun Diver">Fun Diver</option>
                    <option value="Dive Pro">Dive Pro</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="region" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Region</Label>
                  <select
                    id="region"
                    title="Select region"
                    className="mt-1 w-full border border-teal-200 rounded-xl h-10 px-3 bg-teal-50 text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    value={formRegion}
                    onChange={(event) => onRegionChange(event.target.value)}
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="site" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Dive site</Label>
                  <select
                    id="site"
                    title="Select dive site"
                    className="mt-1 w-full border border-teal-200 rounded-xl h-10 px-3 bg-teal-50 text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    value={formSite}
                    onChange={(event) => setFormSite(event.target.value)}
                  >
                    {diveSitesByRegion[formRegion].map((site) => (
                      <option key={site} value={site}>{site}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Date</Label>
                  <Input id="date" type="date" value={formDate} onChange={(event) => setFormDate(event.target.value)} required className="mt-1 rounded-xl border-teal-200" />
                </div>
                <div>
                  <Label htmlFor="visibility" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Visibility (m)</Label>
                  <Input id="visibility" type="number" min={1} max={50} value={formVisibility} onChange={(event) => setFormVisibility(event.target.value)} required className="mt-1 rounded-xl border-teal-200" />
                </div>
                <div>
                  <Label htmlFor="current" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Current 1–5</Label>
                  <Input id="current" type="number" min={1} max={5} value={formCurrent} onChange={(event) => setFormCurrent(event.target.value)} required className="mt-1 rounded-xl border-teal-200" />
                </div>
                <div>
                  <Label htmlFor="waves" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Waves 1–5</Label>
                  <Input id="waves" type="number" min={1} max={5} value={formWaves} onChange={(event) => setFormWaves(event.target.value)} required className="mt-1 rounded-xl border-teal-200" />
                </div>
              </div>

              <div>
                <Label htmlFor="temp" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Water temp (°C)</Label>
                <Input id="temp" type="number" min={15} max={35} value={formTemp} onChange={(event) => setFormTemp(event.target.value)} required className="mt-1 rounded-xl border-teal-200" />
              </div>

              <div>
                <Label htmlFor="sightings" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Sightings (comma-separated)</Label>
                <Input
                  id="sightings"
                  value={formSightings}
                  onChange={(event) => setFormSightings(event.target.value)}
                  placeholder="Manta ray, Turtle, Mola Mola"
                  className="mt-1 rounded-xl border-teal-200"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wide text-slate-600">Notes</Label>
                <Textarea id="notes" value={formNotes} onChange={(event) => setFormNotes(event.target.value)} className="mt-1 rounded-xl border-teal-200" />
              </div>

              <Button type="submit" className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-base">
                Submit report
              </Button>
            </form>
          </div>
        </div>

        {/* Upcoming trips */}
        <div className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-500 px-6 py-4 flex items-center gap-3">
            <MapPinned className="h-5 w-5 text-white" />
            <h2 className="text-white font-bold text-xl">Upcoming Dive Trips</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500 mb-5">Book a spot on our next guided trips — step from bed to boat in minutes.</p>
            <div className="space-y-4">
              {starterTrips.map((trip) => (
                <article key={trip.id} className="rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-teal-900">{trip.site}</h3>
                      <p className="text-xs text-teal-600 mt-0.5">{trip.shopName}</p>
                    </div>
                    <span className="text-xs bg-orange-100 border border-orange-200 text-orange-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                      {trip.seatsLeft} seats left
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    <span className="bg-white border border-teal-200 text-teal-700 px-2 py-1 rounded-lg">📅 {trip.tripDate}</span>
                    <span className="bg-white border border-teal-200 text-teal-700 px-2 py-1 rounded-lg">⏰ {trip.departure}</span>
                  </div>
                  <p className="text-xs text-slate-500">📧 {trip.contact}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiveSiteReports;
