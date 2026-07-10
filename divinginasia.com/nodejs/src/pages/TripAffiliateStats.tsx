import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, MousePointer, Calendar, RefreshCw } from 'lucide-react';

const TRIP_ALLIANCE_ID = '7864578';

interface ClickRow {
  id: string;
  hotel_name: string;
  hotel_url: string;
  affiliate_id: string | null;
  clicked_at: string;
  referrer: string | null;
}

interface HotelStat {
  hotel_name: string;
  clicks: number;
  last_clicked: string;
}

const TripAffiliateStats = () => {
  const [clicks, setClicks] = useState<ClickRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClicks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('affiliate_clicks')
      .select('*')
      .eq('affiliate_id', TRIP_ALLIANCE_ID)
      .order('clicked_at', { ascending: false })
      .limit(500);

    if (error) {
      setError(error.message);
    } else {
      setClicks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClicks();
  }, []);

  // Aggregate clicks by hotel
  const hotelStats: HotelStat[] = Object.values(
    clicks.reduce((acc, click) => {
      if (!acc[click.hotel_name]) {
        acc[click.hotel_name] = { hotel_name: click.hotel_name, clicks: 0, last_clicked: click.clicked_at };
      }
      acc[click.hotel_name].clicks += 1;
      if (click.clicked_at > acc[click.hotel_name].last_clicked) {
        acc[click.hotel_name].last_clicked = click.clicked_at;
      }
      return acc;
    }, {} as Record<string, HotelStat>)
  ).sort((a, b) => b.clicks - a.clicks);

  const totalClicks = clicks.length;
  const todayClicks = clicks.filter(c => {
    const today = new Date().toDateString();
    return new Date(c.clicked_at).toDateString() === today;
  }).length;

  const thisWeekClicks = clicks.filter(c => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(c.clicked_at) > weekAgo;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trip.com Affiliate Stats</h1>
            <p className="text-gray-500 mt-1">Track clicks and commission potential</p>
          </div>
          <Button onClick={fetchClicks} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
            {error} — make sure the <code>affiliate_clicks</code> table exists in Supabase.
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MousePointer className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Clicks</p>
                  <p className="text-3xl font-bold">{totalClicks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today</p>
                  <p className="text-3xl font-bold">{todayClicks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Week</p>
                  <p className="text-3xl font-bold">{thisWeekClicks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Per-Hotel Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Clicks by Hotel</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500 text-center py-8">Loading...</p>
            ) : hotelStats.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No clicks yet. Share your <a href="/trip-booking" className="text-orange-600 underline">Trip.com accommodation page</a> to start earning!</p>
            ) : (
              <div className="space-y-3">
                {hotelStats.map((stat, i) => (
                  <div key={stat.hotel_name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-400 font-mono text-sm w-6">#{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-medium">{stat.hotel_name}</p>
                      <p className="text-xs text-gray-400">
                        Last clicked: {new Date(stat.last_clicked).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Bar */}
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${Math.min((stat.clicks / (hotelStats[0]?.clicks || 1)) * 100, 100)}%` }}
                        />
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 min-w-[40px] justify-center">
                        {stat.clicks}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Clicks Log */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Click Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="text-left py-2 pr-4">Hotel</th>
                    <th className="text-left py-2 pr-4">Time</th>
                    <th className="text-left py-2">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {clicks.slice(0, 50).map(click => (
                    <tr key={click.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2 pr-4 font-medium">{click.hotel_name}</td>
                      <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
                        {new Date(click.clicked_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2 text-gray-400 text-xs truncate max-w-[200px]">
                        {click.referrer || '—'}
                      </td>
                    </tr>
                  ))}
                  {clicks.length === 0 && !loading && (
                    <tr><td colSpan={3} className="text-center text-gray-400 py-8">No clicks recorded yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800">
          <strong>✓ Trip.com Alliance ID is set.</strong> Clicks are being tracked and commission will be attributed on completed bookings.
        </div>
      </div>
    </div>
  );
};

export default TripAffiliateStats;
