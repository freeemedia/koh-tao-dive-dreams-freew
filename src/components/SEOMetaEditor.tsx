import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, RefreshCw, Globe, Facebook, Twitter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SEOMetaEditorProps {
  pageSlug: string;
  onClose: () => void;
}

interface SEOData {
  // Basic SEO
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  robots: string;
  
  // Open Graph (Facebook)
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  
  // Twitter Card
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  
  // Structured Data
  schema_type: string;
  schema_json: string | null;
}

const DEFAULT_SEO: SEOData = {
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  canonical_url: '',
  robots: 'index, follow',
  og_title: '',
  og_description: '',
  og_image: '',
  og_type: 'website',
  twitter_card: 'summary_large_image',
  twitter_title: '',
  twitter_description: '',
  twitter_image: '',
  schema_type: 'WebPage',
  schema_json: null,
};

export const SEOMetaEditor: React.FC<SEOMetaEditorProps> = ({ pageSlug, onClose }) => {
  const [seoData, setSeoData] = useState<SEOData>(DEFAULT_SEO);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSEOData();
  }, [pageSlug]);

  const loadSEOData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
      const baseUrl = apiUrl || window.location.origin;
      const response = await fetch(`${baseUrl}/api/admin/page-seo?slug=${encodeURIComponent(pageSlug)}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setSeoData({
        ...data,
        schema_json: typeof data.schema_json === 'string' ? data.schema_json : JSON.stringify(data.schema_json, null, 2)
      });
    } catch (err) {
      console.error('Failed to load SEO data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const adminToken = window.localStorage.getItem('admin_login_token');
      if (!adminToken) {
        toast.error('Not authenticated. Please login as admin.');
        return;
      }

      let parsedSchemaJson: any = null;
      const rawSchema = (seoData.schema_json || '').trim();
      if (rawSchema) {
        try {
          parsedSchemaJson = JSON.parse(rawSchema);
        } catch {
          toast.error('Structured Data JSON is invalid. Please fix it before saving.');
          setIsSaving(false);
          return;
        }
      }

      const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
      const baseUrl = apiUrl || window.location.origin;
      const response = await fetch(`${baseUrl}/api/admin/page-seo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-login-token': adminToken,
        },
        body: JSON.stringify({
          page_slug: pageSlug,
          ...seoData,
          schema_json: parsedSchemaJson,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      toast.success('SEO metadata saved successfully');
      onClose();
    } catch (err) {
      console.error('Failed to save SEO data:', err);
      const message = err instanceof Error ? err.message : 'Failed to save SEO metadata';
      toast.error(message || 'Failed to save SEO metadata');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof SEOData, value: string) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
  };

  const autoFillOG = () => {
    setSeoData(prev => ({
      ...prev,
      og_title: prev.og_title || prev.meta_title,
      og_description: prev.og_description || prev.meta_description,
    }));
    toast.success('Auto-filled Open Graph data from basic SEO');
  };

  const autoFillTwitter = () => {
    setSeoData(prev => ({
      ...prev,
      twitter_title: prev.twitter_title || prev.meta_title,
      twitter_description: prev.twitter_description || prev.meta_description,
      twitter_image: prev.twitter_image || prev.og_image,
    }));
    toast.success('Auto-filled Twitter Card data');
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading SEO data...</div>;
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="structured">Structured Data</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Basic SEO Tags
              </CardTitle>
              <CardDescription>
                Essential metadata for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={seoData.meta_title}
                  onChange={(e) => handleChange('meta_title', e.target.value)}
                  placeholder="e.g., PADI Open Water Course - Koh Tao Dive Dreams"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {seoData.meta_title.length}/60 characters (optimal: 50-60)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={seoData.meta_description}
                  onChange={(e) => handleChange('meta_description', e.target.value)}
                  placeholder="Brief description of the page content..."
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {seoData.meta_description.length}/160 characters (optimal: 150-160)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_keywords">Keywords (comma-separated)</Label>
                <Input
                  id="meta_keywords"
                  value={seoData.meta_keywords}
                  onChange={(e) => handleChange('meta_keywords', e.target.value)}
                  placeholder="scuba diving, padi course, koh tao"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input
                  id="canonical_url"
                  value={seoData.canonical_url}
                  onChange={(e) => handleChange('canonical_url', e.target.value)}
                  placeholder="https://divinginasia.com/courses/open-water"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="robots">Robots Directive</Label>
                <select
                  id="robots"
                  value={seoData.robots}
                  onChange={(e) => handleChange('robots', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="index, follow">Index, Follow (Default)</option>
                  <option value="noindex, follow">No Index, Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Facebook className="h-5 w-5" />
                  Open Graph (Facebook)
                </div>
                <Button size="sm" variant="outline" onClick={autoFillOG}>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Auto-fill from Basic
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="og_title">OG Title</Label>
                <Input
                  id="og_title"
                  value={seoData.og_title}
                  onChange={(e) => handleChange('og_title', e.target.value)}
                  placeholder="Title when shared on Facebook"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_description">OG Description</Label>
                <Textarea
                  id="og_description"
                  value={seoData.og_description}
                  onChange={(e) => handleChange('og_description', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  value={seoData.og_image}
                  onChange={(e) => handleChange('og_image', e.target.value)}
                  placeholder="https://divinginasia.com/images/open-water-og.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 1200x630px
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_type">OG Type</Label>
                <select
                  id="og_type"
                  value={seoData.og_type}
                  onChange={(e) => handleChange('og_type', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="website">Website</option>
                  <option value="article">Article</option>
                  <option value="product">Product</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Twitter className="h-5 w-5" />
                  Twitter Card
                </div>
                <Button size="sm" variant="outline" onClick={autoFillTwitter}>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Auto-fill
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter_card">Card Type</Label>
                <select
                  id="twitter_card"
                  value={seoData.twitter_card}
                  onChange={(e) => handleChange('twitter_card', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary with Large Image</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_title">Twitter Title</Label>
                <Input
                  id="twitter_title"
                  value={seoData.twitter_title}
                  onChange={(e) => handleChange('twitter_title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_description">Twitter Description</Label>
                <Textarea
                  id="twitter_description"
                  value={seoData.twitter_description}
                  onChange={(e) => handleChange('twitter_description', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_image">Twitter Image URL</Label>
                <Input
                  id="twitter_image"
                  value={seoData.twitter_image}
                  onChange={(e) => handleChange('twitter_image', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Structured Data (Schema.org)</CardTitle>
              <CardDescription>
                JSON-LD schema markup for rich search results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schema_type">Schema Type</Label>
                <select
                  id="schema_type"
                  value={seoData.schema_type}
                  onChange={(e) => handleChange('schema_type', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="WebPage">Web Page</option>
                  <option value="Course">Course</option>
                  <option value="Product">Product</option>
                  <option value="Article">Article</option>
                  <option value="LocalBusiness">Local Business</option>
                  <option value="TouristAttraction">Tourist Attraction</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schema_json">Schema JSON-LD</Label>
                <Textarea
                  id="schema_json"
                  value={seoData.schema_json}
                  onChange={(e) => handleChange('schema_json', e.target.value)}
                  placeholder='{"@context": "https://schema.org", "@type": "Course", ...}'
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Enter valid JSON-LD structured data
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Google Search Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white">
                <div className="text-sm text-blue-600 mb-1">
                  divinginasia.com › courses › {pageSlug}
                </div>
                <div className="text-xl text-blue-800 mb-2 font-medium">
                  {seoData.meta_title || 'Page Title'}
                </div>
                <div className="text-sm text-gray-600">
                  {seoData.meta_description || 'Page description will appear here...'}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facebook Share Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-white">
                {seoData.og_image && (
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <img src={seoData.og_image} alt="OG" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-3">
                  <div className="text-xs text-gray-500 uppercase mb-1">
                    divinginasia.com
                  </div>
                  <div className="font-semibold text-lg mb-1">
                    {seoData.og_title || seoData.meta_title || 'Page Title'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {seoData.og_description || seoData.meta_description || 'Description'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
              Save SEO Data
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
