import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, Shield, AlertTriangle, CheckCircle, XCircle, Lock, Unlock, RefreshCw, Play } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface SecurityScannerProps {
  pageSlug: string;
  onClose: () => void;
}

interface SecuritySettings {
  is_secured: boolean;
  require_auth: boolean;
  require_admin: boolean;
  allowed_roles: string[];
  ip_whitelist: string;
  rate_limit_enabled: boolean;
  rate_limit_requests: number;
  rate_limit_window: number;
  csrf_protection: boolean;
  xss_protection: boolean;
  content_security_policy: string;
}

interface ScanResult {
  category: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  recommendation?: string;
}

const DEFAULT_SETTINGS: SecuritySettings = {
  is_secured: false,
  require_auth: false,
  require_admin: false,
  allowed_roles: [],
  ip_whitelist: '',
  rate_limit_enabled: true,
  rate_limit_requests: 100,
  rate_limit_window: 60,
  csrf_protection: true,
  xss_protection: true,
  content_security_policy: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
};

export const SecurityScanner: React.FC<SecurityScannerProps> = ({ pageSlug, onClose }) => {
  const [settings, setSettings] = useState<SecuritySettings>(DEFAULT_SETTINGS);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSecuritySettings();
  }, [pageSlug]);

  const loadSecuritySettings = async () => {
    try {
      // @ts-expect-error - page_security table will be available after migration
      const { data, error } = await supabase
        .from('page_security')
        .select('*')
        .eq('page_slug', pageSlug)
        .single();

      if (!error && data) {
        setSettings(data);
      }
    } catch (err) {
      console.error('Failed to load security settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const runSecurityScan = async () => {
    setIsScanning(true);
    setScanResults([]);

    // Simulate security scanning with various checks
    const results: ScanResult[] = [];

    // Check 1: Authentication
    if (!settings.require_auth) {
      results.push({
        category: 'Authentication',
        status: 'warning',
        message: 'Page does not require authentication',
        recommendation: 'Enable authentication if this page contains sensitive content',
      });
    } else {
      results.push({
        category: 'Authentication',
        status: 'pass',
        message: 'Authentication is enabled',
      });
    }

    // Check 2: CSRF Protection
    if (settings.csrf_protection) {
      results.push({
        category: 'CSRF Protection',
        status: 'pass',
        message: 'CSRF protection is enabled',
      });
    } else {
      results.push({
        category: 'CSRF Protection',
        status: 'fail',
        message: 'CSRF protection is disabled',
        recommendation: 'Enable CSRF protection to prevent cross-site request forgery attacks',
      });
    }

    // Check 3: XSS Protection
    if (settings.xss_protection) {
      results.push({
        category: 'XSS Protection',
        status: 'pass',
        message: 'XSS protection is enabled',
      });
    } else {
      results.push({
        category: 'XSS Protection',
        status: 'fail',
        message: 'XSS protection is disabled',
        recommendation: 'Enable XSS protection to prevent script injection attacks',
      });
    }

    // Check 4: Rate Limiting
    if (settings.rate_limit_enabled) {
      results.push({
        category: 'Rate Limiting',
        status: 'pass',
        message: `Rate limit: ${settings.rate_limit_requests} requests per ${settings.rate_limit_window}s`,
      });
    } else {
      results.push({
        category: 'Rate Limiting',
        status: 'warning',
        message: 'Rate limiting is disabled',
        recommendation: 'Enable rate limiting to prevent DDoS attacks',
      });
    }

    // Check 5: Content Security Policy
    if (settings.content_security_policy) {
      results.push({
        category: 'Content Security Policy',
        status: 'pass',
        message: 'CSP headers are configured',
      });
    } else {
      results.push({
        category: 'Content Security Policy',
        status: 'warning',
        message: 'No CSP headers configured',
        recommendation: 'Add Content Security Policy headers to mitigate XSS attacks',
      });
    }

    // Check 6: IP Whitelist
    if (settings.ip_whitelist && settings.ip_whitelist.trim()) {
      const ips = settings.ip_whitelist.split('\n').filter(ip => ip.trim());
      results.push({
        category: 'IP Whitelist',
        status: 'pass',
        message: `${ips.length} IP address(es) whitelisted`,
      });
    } else if (settings.require_admin) {
      results.push({
        category: 'IP Whitelist',
        status: 'warning',
        message: 'No IP whitelist configured for admin page',
        recommendation: 'Consider adding IP whitelist for additional security',
      });
    }

    // Check 7: Admin Protection
    if (settings.require_admin) {
      results.push({
        category: 'Admin Access',
        status: 'pass',
        message: 'Page requires admin privileges',
      });
    }

    // Simulate delay for realistic scanning experience
    await new Promise(resolve => setTimeout(resolve, 1500));

    setScanResults(results);
    setIsScanning(false);
    toast.success('Security scan completed');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // @ts-expect-error - page_security table will be available after migration
      const { error } = await supabase
        .from('page_security')
        .upsert({
          page_slug: pageSlug,
          ...settings,
          updated_by: user?.email || null,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'page_slug' });

      if (error) throw error;

      // Update metadata flag
      // @ts-expect-error - page_metadata table will be available after migration
      await supabase
        .from('page_metadata')
        .upsert({
          page_slug: pageSlug,
          is_secured: settings.is_secured,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'page_slug' });

      toast.success('Security settings saved successfully');
      onClose();
    } catch (err) {
      console.error('Failed to save security settings:', err);
      toast.error('Failed to save security settings');
    } finally {
      setIsSaving(false);
    }
  };

  const getScanResultIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pass: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      fail: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading security settings...</div>;
  }

  const passCount = scanResults.filter(r => r.status === 'pass').length;
  const warningCount = scanResults.filter(r => r.status === 'warning').length;
  const failCount = scanResults.filter(r => r.status === 'fail').length;

  return (
    <div className="space-y-4">
      {/* Security Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Scanner
            </div>
            <Button onClick={runSecurityScan} disabled={isScanning}>
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Scan
                </>
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            Scan this page for potential security vulnerabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {scanResults.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Click "Run Scan" to analyze security settings
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">{passCount} Passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-semibold">{warningCount} Warnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="font-semibold">{failCount} Failed</span>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-3">
                {scanResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {getScanResultIcon(result.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{result.category}</span>
                          <Badge variant="outline" className={getStatusBadge(result.status)}>
                            {result.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{result.message}</p>
                        {result.recommendation && (
                          <p className="text-sm text-blue-600 italic">
                            💡 {result.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Configure access controls and protection mechanisms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Security */}
          <div className="space-y-4 pb-4 border-b">
            <h4 className="font-semibold flex items-center gap-2">
              {settings.is_secured ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              Page Protection
            </h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="is_secured" className="flex-1">
                Enable Security
                <p className="text-xs text-muted-foreground font-normal">
                  Activate security features for this page
                </p>
              </Label>
              <Switch
                id="is_secured"
                checked={settings.is_secured}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, is_secured: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="require_auth" className="flex-1">
                Require Authentication
                <p className="text-xs text-muted-foreground font-normal">
                  Users must be logged in to access this page
                </p>
              </Label>
              <Switch
                id="require_auth"
                checked={settings.require_auth}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, require_auth: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="require_admin" className="flex-1">
                Require Admin Access
                <p className="text-xs text-muted-foreground font-normal">
                  Only administrators can access this page
                </p>
              </Label>
              <Switch
                id="require_admin"
                checked={settings.require_admin}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, require_admin: checked }))}
              />
            </div>
          </div>

          {/* Advanced Protection */}
          <div className="space-y-4 pb-4 border-b">
            <h4 className="font-semibold">Attack Protection</h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="csrf_protection" className="flex-1">
                CSRF Protection
                <p className="text-xs text-muted-foreground font-normal">
                  Prevent cross-site request forgery attacks
                </p>
              </Label>
              <Switch
                id="csrf_protection"
                checked={settings.csrf_protection}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, csrf_protection: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="xss_protection" className="flex-1">
                XSS Protection
                <p className="text-xs text-muted-foreground font-normal">
                  Prevent cross-site scripting attacks
                </p>
              </Label>
              <Switch
                id="xss_protection"
                checked={settings.xss_protection}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, xss_protection: checked }))}
              />
            </div>
          </div>

          {/* Rate Limiting */}
          <div className="space-y-4 pb-4 border-b">
            <h4 className="font-semibold">Rate Limiting</h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="rate_limit_enabled" className="flex-1">
                Enable Rate Limiting
                <p className="text-xs text-muted-foreground font-normal">
                  Limit requests to prevent abuse
                </p>
              </Label>
              <Switch
                id="rate_limit_enabled"
                checked={settings.rate_limit_enabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, rate_limit_enabled: checked }))}
              />
            </div>

            {settings.rate_limit_enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rate_limit_requests">Max Requests</Label>
                  <input
                    id="rate_limit_requests"
                    type="number"
                    value={settings.rate_limit_requests}
                    onChange={(e) => setSettings(prev => ({ ...prev, rate_limit_requests: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-md mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rate_limit_window">Time Window (seconds)</Label>
                  <input
                    id="rate_limit_window"
                    type="number"
                    value={settings.rate_limit_window}
                    onChange={(e) => setSettings(prev => ({ ...prev, rate_limit_window: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-md mt-1"
                  />
                </div>
              </div>
            )}
          </div>

          {/* IP Whitelist */}
          <div className="space-y-4 pb-4 border-b">
            <h4 className="font-semibold">IP Whitelist (Optional)</h4>
            <div className="space-y-2">
              <Label htmlFor="ip_whitelist">
                Allowed IP Addresses
                <p className="text-xs text-muted-foreground font-normal">
                  Enter one IP address per line. Leave empty to allow all IPs.
                </p>
              </Label>
              <Textarea
                id="ip_whitelist"
                value={settings.ip_whitelist}
                onChange={(e) => setSettings(prev => ({ ...prev, ip_whitelist: e.target.value }))}
                placeholder="192.168.1.1&#10;10.0.0.1"
                rows={4}
              />
            </div>
          </div>

          {/* Content Security Policy */}
          <div className="space-y-4">
            <h4 className="font-semibold">Content Security Policy</h4>
            <div className="space-y-2">
              <Label htmlFor="content_security_policy">
                CSP Headers
                <p className="text-xs text-muted-foreground font-normal">
                  Define allowed sources for scripts, styles, and other resources
                </p>
              </Label>
              <Textarea
                id="content_security_policy"
                value={settings.content_security_policy}
                onChange={(e) => setSettings(prev => ({ ...prev, content_security_policy: e.target.value }))}
                rows={3}
                className="font-mono text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Security Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
