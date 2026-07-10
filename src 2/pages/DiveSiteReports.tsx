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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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

  const [formRegion, setFormRegion] = useState<string>('Koh Tao');
  const [formSite, setFormSite] = useState<string>(diveSitesByRegion['Koh Tao'][0]);
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
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-950 via-sky-900 to-blue-800 text-white">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_20%,#ffffff_0,transparent_40%),radial-gradient(circle_at_80%_0%,#ffffff_0,transparent_45%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <p className="uppercase tracking-[0.2em] text-cyan-200 text-xs mb-4">Dive Intelligence</p>
          <h1 className="text-4xl md:text-6xl font-black max-w-4xl leading-tight mb-5">
            Koh Tao Dive Site Reports
          </h1>
          <p className="text-cyan-50/90 max-w-3xl text-lg">
            User-submitted dive conditions from Dive Pros and Fun Divers. Filter reports, submit your own,
            review recent visibility trends, and explore species highlights.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Badge className="bg-white/15 border-white/30 text-white">All divers can submit reports</Badge>
            <Badge className="bg-white/15 border-white/30 text-white">Dive Pro filtering enabled</Badge>
            <Badge className="bg-white/15 border-white/30 text-white">Multi-region support</Badge>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[1.6fr_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Filter className="h-5 w-5 text-sky-700" />
              Live Reports
            </CardTitle>
            <CardDescription>Filter by diver role and region like the iPhone app workflow.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="roleFilter">Who submitted</Label>
                <select
                  id="roleFilter"
                  className="mt-2 w-full border border-slate-200 rounded-md h-10 px-3 bg-white"
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value as 'All' | DiverRole)}
                >
                  <option value="All">All users</option>
                  <option value="Dive Pro">Dive Pros only</option>
                  <option value="Fun Diver">Fun Divers only</option>
                </select>
              </div>
              <div>
                <Label htmlFor="regionFilter">Region</Label>
                <select
                  id="regionFilter"
                  className="mt-2 w-full border border-slate-200 rounded-md h-10 px-3 bg-white"
                  value={regionFilter}
                  onChange={(event) => setRegionFilter(event.target.value)}
                >
                  <option value="All regions">All regions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
              {filteredReports.map((report) => (
                <article key={report.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{report.site}</h3>
                    <Badge variant="outline" className="text-xs">{report.region}</Badge>
                    <Badge className={roleBadge(report.role)}>{report.role}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Submitted by {report.submittedBy} on {formatDate(report.date)}
                  </p>
                  <div className="grid sm:grid-cols-4 gap-2 text-sm mb-3">
                    <div className="bg-slate-100 rounded p-2">Visibility: {report.visibilityM}m</div>
                    <div className="bg-slate-100 rounded p-2">Current: {report.current}/5</div>
                    <div className="bg-slate-100 rounded p-2">Waves: {report.waves}/5</div>
                    <div className="bg-slate-100 rounded p-2">Temp: {report.temperatureC}C</div>
                  </div>
                  {report.sightings.length > 0 && (
                    <p className="text-sm mb-2">
                      <span className="font-medium">Sightings:</span> {report.sightings.join(', ')}
                    </p>
                  )}
                  {report.notes && <p className="text-sm text-slate-700">{report.notes}</p>}
                </article>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-sky-700" />Recent Conditions</CardTitle>
              <CardDescription>Average visibility trend from current report feed.</CardDescription>
            </CardHeader>
            <CardContent className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgVisibility" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Fish className="h-5 w-5 text-sky-700" />Species Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {featureSpecies.map((item) => (
                <div key={item.site} className="rounded border border-slate-200 p-3">
                  <p className="font-medium text-sm mb-1">{item.site}</p>
                  <p className="text-sm text-slate-600">{item.species.join(', ')}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10 grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl"><Send className="h-5 w-5 text-sky-700" />Submit Dive Report</CardTitle>
            <CardDescription>Open to all divers.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" value={formName} onChange={(event) => setFormName(event.target.value)} placeholder="Optional" />
                </div>
                <div>
                  <Label htmlFor="role">Diver type</Label>
                  <select
                    id="role"
                    className="mt-2 w-full border border-slate-200 rounded-md h-10 px-3 bg-white"
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
                  <Label htmlFor="region">Region</Label>
                  <select
                    id="region"
                    className="mt-2 w-full border border-slate-200 rounded-md h-10 px-3 bg-white"
                    value={formRegion}
                    onChange={(event) => onRegionChange(event.target.value)}
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="site">Dive site</Label>
                  <select
                    id="site"
                    className="mt-2 w-full border border-slate-200 rounded-md h-10 px-3 bg-white"
                    value={formSite}
                    onChange={(event) => setFormSite(event.target.value)}
                  >
                    {diveSitesByRegion[formRegion].map((site) => (
                      <option key={site} value={site}>
                        {site}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={formDate} onChange={(event) => setFormDate(event.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="visibility">Visibility (m)</Label>
                  <Input id="visibility" type="number" min={1} max={50} value={formVisibility} onChange={(event) => setFormVisibility(event.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="current">Current (1-5)</Label>
                  <Input id="current" type="number" min={1} max={5} value={formCurrent} onChange={(event) => setFormCurrent(event.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="waves">Waves (1-5)</Label>
                  <Input id="waves" type="number" min={1} max={5} value={formWaves} onChange={(event) => setFormWaves(event.target.value)} required />
                </div>
              </div>

              <div>
                <Label htmlFor="temp">Temperature (C)</Label>
                <Input id="temp" type="number" min={15} max={35} value={formTemp} onChange={(event) => setFormTemp(event.target.value)} required />
              </div>

              <div>
                <Label htmlFor="sightings">Sightings (comma-separated)</Label>
                <Input
                  id="sightings"
                  value={formSightings}
                  onChange={(event) => setFormSightings(event.target.value)}
                  placeholder="Whale shark, Turtle, Barracuda"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={formNotes} onChange={(event) => setFormNotes(event.target.value)} />
              </div>

              <Button type="submit" className="w-full">Submit report</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl"><MapPinned className="h-5 w-5 text-sky-700" />Upcoming Dive Trips</CardTitle>
            <CardDescription>Dive shops can list upcoming trips so divers can contact and book.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {starterTrips.map((trip) => (
              <article key={trip.id} className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-semibold">{trip.shopName}</h3>
                  <Badge variant="outline">{trip.seatsLeft} seats left</Badge>
                </div>
                <p className="text-sm text-slate-600">{trip.site} • {trip.tripDate} • {trip.departure}</p>
                <p className="text-sm mt-2">Contact: {trip.contact}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DiveSiteReports;
