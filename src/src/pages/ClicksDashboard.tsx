import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { hasAdminAccess } from '@/lib/adminAccess';

type Provider = 'agoda' | 'booking' | 'trip' | 'unknown';

type ClickEvent = {
  id: string;
  provider: Provider | string;
  hotel_name: string | null;
  hotel_url: string;
  affiliate_id: string | null;
  placement: string | null;
  page_path: string | null;
  referrer: string | null;
  user_agent: string | null;
  session_id: string | null;
  clicked_at: string;
};

type ClicksResponse = {
  total: number;
  byProvider: Record<string, number>;
  recent: ClickEvent[];
};

const API_BASE = ((import.meta.env.VITE_API_BASE_URL as string | undefined) || '').trim();

const buildEndpoint = (provider: string) => {
  const base = API_BASE ? API_BASE.replace(/\/$/, '') : '';
  const url = `${base}/api/affiliate-clicks`;

  if (provider === 'all') {
    return url;
  }

  return `${url}?provider=${encodeURIComponent(provider)}`;
};

const ClicksDashboard = () => {
  const navigate = useNavigate();
  const [providerFilter, setProviderFilter] = useState<'all' | 'agoda' | 'booking' | 'trip'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ClicksResponse>({ total: 0, byProvider: {}, recent: [] });

  // Check admin access on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || !hasAdminAccess(user)) {
        navigate('/admin/login');
        return;
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchClicks = async (provider: 'all' | 'agoda' | 'booking' | 'trip') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(buildEndpoint(provider), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`Failed to load clicks (${response.status})`);
      }

      const json = (await response.json()) as ClicksResponse;
      setData({
        total: Number(json.total || 0),
        byProvider: json.byProvider || {},
        recent: Array.isArray(json.recent) ? json.recent : [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clicks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClicks(providerFilter);
  }, [providerFilter]);

  const stats = useMemo(() => {
    const agoda = data.byProvider.agoda || 0;
    const booking = data.byProvider.booking || 0;
    const trip = data.byProvider.trip || 0;
    const unknown = data.byProvider.unknown || 0;

    return { agoda, booking, trip, unknown };
  }, [data.byProvider]);

  const exportCsv = () => {
    const header = [
      'clicked_at',
      'provider',
      'hotel_name',
      'hotel_url',
      'affiliate_id',
      'placement',
      'page_path',
      'session_id',
    ];

    const rows = data.recent.map((row) => [
      row.clicked_at,
      row.provider || '',
      row.hotel_name || '',
      row.hotel_url || '',
      row.affiliate_id || '',
      row.placement || '',
      row.page_path || '',
      row.session_id || '',
    ]);

    const escape = (value: string) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [header, ...rows].map((line) => line.map((x) => escape(x)).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `affiliate-clicks-${providerFilter}-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="container mx-auto px-4 pt-20 pb-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Clicks Dashboard</h1>
          <p className="text-muted-foreground">Live outbound click tracking for Agoda, Booking, and Trip links.</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={providerFilter} onValueChange={(v) => setProviderFilter(v as typeof providerFilter)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All providers</SelectItem>
              <SelectItem value="agoda">Agoda</SelectItem>
              <SelectItem value="booking">Booking</SelectItem>
              <SelectItem value="trip">Trip</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => fetchClicks(providerFilter)} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button onClick={exportCsv} disabled={!data.recent.length}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{data.total}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Agoda</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.agoda}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Booking</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.booking}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Trip</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.trip}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Unknown</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.unknown}</p></CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Recent Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          {!error && !data.recent.length ? (
            <p className="text-sm text-muted-foreground">No click events yet. Click a hotel link and refresh.</p>
          ) : null}

          {!!data.recent.length ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Placement</TableHead>
                    <TableHead>Page</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recent.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="whitespace-nowrap">{new Date(row.clicked_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="uppercase">{row.provider || 'unknown'}</Badge>
                      </TableCell>
                      <TableCell className="min-w-[220px]">{row.hotel_name || 'N/A'}</TableCell>
                      <TableCell>{row.placement || 'N/A'}</TableCell>
                      <TableCell className="max-w-[220px] truncate" title={row.page_path || ''}>{row.page_path || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </main>
  );
};

export default ClicksDashboard;