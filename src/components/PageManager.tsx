import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Edit, Globe, Shield, Search, Plus, Eye, Lock, Unlock } from 'lucide-react';
import { SEOMetaEditor } from './SEOMetaEditor';
import { SecurityScanner } from './SecurityScanner';
// import { PageContentEditor } from './PageContentEditor';

interface PageInfo {
  slug: string;
  title: string;
  category: 'course' | 'specialty' | 'dive-site' | 'marine-life' | 'info' | 'other';
  hasEnglish: boolean;
  hasDutch: boolean;
  hasSEO: boolean;
  isSecured: boolean;
  draftStatus?: 'draft' | 'published';
  lastModified?: string;
}

const PAGE_REGISTRY: PageInfo[] = [
  { slug: 'home', title: 'Homepage', category: 'other', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'contact', title: 'Contact Section', category: 'other', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },

  // COURSES
  { slug: 'open-water', title: 'PADI Open Water', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'advanced', title: 'PADI Advanced', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'rescue', title: 'PADI Rescue Diver', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'efr', title: 'Emergency First Response', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'divemaster', title: 'PADI Divemaster', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'instructor', title: 'PADI Instructor (IDC)', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'discover-scuba', title: 'Discover Scuba Diving', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'scuba-diver', title: 'PADI Scuba Diver', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'scuba-review', title: 'Scuba Review/ReActivate', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'discover-scuba-deluxe', title: 'DSD Deluxe', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'msdt-program', title: 'MSDT Program', category: 'course', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },

  // SPECIALTIES
  { slug: 'specialty/night-diver', title: 'Night Diver Specialty', category: 'specialty', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'specialty/deep-diver', title: 'Deep Diver Specialty', category: 'specialty', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'specialty/wreck-diver', title: 'Wreck Diver Specialty', category: 'specialty', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'specialty/enriched-air', title: 'Enriched Air (Nitrox)', category: 'specialty', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'specialty/underwater-photography', title: 'Underwater Photography', category: 'specialty', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'specialty/sidemount', title: 'Sidemount Diver', category: 'specialty', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },

  // DIVE SITES
  { slug: 'dive-sites/sail-rock', title: 'Sail Rock', category: 'dive-site', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  // { slug: 'dive-sites/chumphon-pinnacle', title: 'Chumphon Pinnacle', category: 'dive-site', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'dive-sites/japanese-gardens', title: 'Japanese Gardens', category: 'dive-site', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'dive-sites/htms-sattakut', title: 'HTMS Sattakut Wreck', category: 'dive-site', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'dive-sites/twins', title: 'The Twins', category: 'dive-site', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'dive-sites/shark-island', title: 'Shark Island', category: 'dive-site', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },

  // MARINE LIFE
  { slug: 'marine-life/whale-shark', title: 'Whale Shark', category: 'marine-life', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'marine-life/green-sea-turtle', title: 'Green Sea Turtle', category: 'marine-life', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'marine-life/hawksbill-turtle', title: 'Hawksbill Turtle', category: 'marine-life', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },

  // INFO PAGES
  { slug: 'accommodation', title: 'Accommodation', category: 'info', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'koh-tao-info', title: 'Koh Tao Information', category: 'info', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'how-to-get-here', title: 'How to Get Here', category: 'info', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'things-to-do', title: 'Things to Do', category: 'info', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
  { slug: 'weather', title: 'Weather Information', category: 'info', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },

  // OTHER
  { slug: 'fun-diving', title: 'Fun Diving', category: 'other', hasEnglish: true, hasDutch: true, hasSEO: false, isSecured: false },
];

const CATEGORY_COLORS = {
  course: 'bg-blue-100 text-blue-800',
  specialty: 'bg-purple-100 text-purple-800',
  'dive-site': 'bg-cyan-100 text-cyan-800',
  'marine-life': 'bg-green-100 text-green-800',
  info: 'bg-orange-100 text-orange-800',
  other: 'bg-gray-100 text-gray-800',
};

export const PageManager: React.FC = () => {
  const [pages, setPages] = useState<PageInfo[]>(PAGE_REGISTRY);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingPage, setEditingPage] = useState<{ slug: string; locale: string } | null>(null);
  const [seoPage, setSeoPage] = useState<string | null>(null);
  const [securityPage, setSecurityPage] = useState<string | null>(null);


  // Optionally, you can still fetch metadata and merge it, but always show all pages from PAGE_REGISTRY
  useEffect(() => {
    const loadPageMetadata = async () => {
      try {
        const { data, error } = await supabase
          .from('page_metadata')
          .select('page_slug, has_seo, is_secured, draft_status, updated_at');

        if (!error && data) {
          setPages(PAGE_REGISTRY.map(page => {
            const meta = data.find((d: any) => d.page_slug === page.slug);
            if (meta !== null && typeof meta === 'object' && !('message' in meta)) {
              return {
                ...page,
                hasSEO: 'has_seo' in meta ? meta.has_seo || false : false,
                isSecured: 'is_secured' in meta ? meta.is_secured || false : false,
                draftStatus: 'draft_status' in meta ? (meta.draft_status as 'draft' | 'published') || 'published' : 'published',
                lastModified: 'updated_at' in meta ? meta.updated_at : undefined,
              };
            }
            return page;
          }));
        } else {
          setPages(PAGE_REGISTRY);
        }
      } catch (err) {
        setPages(PAGE_REGISTRY);
        console.error('Failed to load page metadata:', err);
      }
    };
    loadPageMetadata();
  }, [editingPage]);

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || page.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (editingPage) {
    // Provide a minimal fallbackContent for the editor (can be improved per page/locale)
    let fallbackContent: Record<string, string> = {};
    if (editingPage.slug === 'open-water' && editingPage.locale === 'en') {
      fallbackContent = {
        hero_title: 'PADI Open Water Course',
        hero_subtitle: "The world's most popular scuba course. Learn the fundamentals of scuba diving and get certified to dive independently with a buddy, to 18 metres/60 feet.",
        course_overview: "The Open Water course combines knowledge development, confined water dives (pool) and open water dives. You'll learn equipment setup, basic underwater skills, buoyancy control and dive planning. Our instructors keep groups small and emphasize safety and fun.",
        price_thb: '11000',
        duration: '3-4 days',
        about_headline: 'Small island, 21 km², lush and surrounded by more than 15 dive sites.',
        about_sites_line: 'WHITE ROCK - TWINS - GREEN ROCK - CHUMPHON PINNACLE - SAIL ROCK - SOUTHWEST PINNACLE - AND MORE',
        about_map_alt: 'Map of Koh Tao and dive sites',
        about_title: 'From PADI Open Water certifications to PADI Divemaster internships',
        about_paragraph_1: 'Koh Tao is not only a top destination in Thailand for your diving holiday, but also ideal for completing almost all PADI dive certifications, for both beginners and experienced divers.',
        about_paragraph_2: 'Lifetime certifications valid worldwide, at a surprisingly low price. Earn your PADI diving certification here for 11500 baht, now including 4 nights accommodation (room with private bathroom) in the course price.',
        about_note: 'Free accommodation with our courses can only be guaranteed if booked 7 days in advance. If our accommodation is not available, we will assist you with staying in one of our partner resorts.',
      };
    } else if (editingPage.slug === 'open-water' && editingPage.locale === 'nl') {
      fallbackContent = {
        hero_title: 'PADI Open Water-cursus',
        hero_subtitle: 'De populairste duikcursus ter wereld. Je leert de basis van het duiken en behaalt je brevet om zelfstandig met een buddy te duiken tot 18 meter/60 voet.',
        course_overview: 'De Open Water-cursus combineert theorie, beschut water-training (zwembad) en buitenwaterduiken. Je leert uitrusting opbouwen, basisvaardigheden onder water, drijfvermogen en duikplanning. Onze instructeurs werken met kleine groepen en leggen de nadruk op veiligheid en plezier.',
        price_thb: '11000',
        duration: '3-4 dagen',
        about_headline: 'Klein eiland, 21 km², groen en omringd door meer dan 15 duiklocaties.',
        about_sites_line: 'WHITE ROCK - TWINS - GREEN ROCK - CHUMPHON PINNACLE - SAIL ROCK - SOUTHWEST PINNACLE - EN MEER',
        about_map_alt: 'Kaart van Koh Tao en duiklocaties',
        about_title: 'Van PADI Open Water-certificering tot PADI Divemaster-internships',
        about_paragraph_1: 'Koh Tao is niet alleen een topbestemming in Thailand voor je duikvakantie, maar ook ideaal om bijna alle PADI-duikcertificaten te behalen, voor zowel beginners als ervaren duikers.',
        about_paragraph_2: 'Levenslange certificaten die wereldwijd geldig zijn, voor een verrassend lage prijs. Behaal je PADI-duikcertificaat hier voor 11500 baht, nu inclusief 4 overnachtingen (kamer met badkamer) in de cursusprijs.',
        about_note: 'Gratis accommodatie bij onze cursussen kan alleen worden gegarandeerd als er minimaal 7 dagen van tevoren wordt geboekt. Als onze accommodatie niet beschikbaar is, helpen we je graag met een verblijf in een van onze partnerresorts.',
      };
    } else {
      fallbackContent = {
        hero_title: '',
        hero_subtitle: '',
        course_overview: '',
        price_thb: '',
        duration: '',
        about_headline: '',
        about_sites_line: '',
        about_map_alt: '',
        about_title: '',
        about_paragraph_1: '',
        about_paragraph_2: '',
        about_note: '',
        courses_section_title: '',
        courses_section_subtitle: '',
        gallery_headline: '',
        gallery_subtitle: '',
      };
    }
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Editing: {pages.find(p => p.slug === editingPage.slug)?.title} ({editingPage.locale.toUpperCase()})
          </h3>
          <Button onClick={() => setEditingPage(null)} variant="outline">
            Back to Page List
          </Button>
        </div>
        {/* PageContentEditor removed */}
      </div>
    );
  }

  if (seoPage) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            SEO & Meta Tags: {pages.find(p => p.slug === seoPage)?.title}
          </h3>
          <Button onClick={() => setSeoPage(null)} variant="outline">
            Back to Page List
          </Button>
        </div>
        <SEOMetaEditor pageSlug={seoPage} onClose={() => {
          setSeoPage(null);
          loadPageMetadata();
        }} />
      </div>
    );
  }

  if (securityPage) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Security Settings: {pages.find(p => p.slug === securityPage)?.title}
          </h3>
          <Button onClick={() => setSecurityPage(null)} variant="outline">
            Back to Page List
          </Button>
        </div>
        <SecurityScanner pageSlug={securityPage} onClose={() => {
          setSecurityPage(null);
          loadPageMetadata();
        }} />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>All Pages Management</span>
          <div className="flex gap-2">
            <Badge variant="outline">{filteredPages.length} pages</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            aria-label="Filter pages by category"
            title="Filter pages by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            <option value="all">All Categories</option>
            <option value="course">Courses</option>
            <option value="specialty">Specialties</option>
            <option value="dive-site">Dive Sites</option>
            <option value="marine-life">Marine Life</option>
            <option value="info">Information</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Pages Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Languages</TableHead>
                <TableHead className="text-center">SEO</TableHead>
                <TableHead className="text-center">Security</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow key={page.slug}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{page.title}</div>
                      <div className="text-xs text-muted-foreground">{page.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={CATEGORY_COLORS[page.category]}>
                      {page.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center">
                      {page.hasEnglish && <Badge variant="outline" className="text-xs">EN</Badge>}
                      {page.hasDutch && <Badge variant="outline" className="text-xs">NL</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {page.hasSEO ? (
                      <Badge className="bg-green-100 text-green-800">✓</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-400">—</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {page.isSecured ? (
                      <Lock className="h-4 w-4 text-green-600 mx-auto" />
                    ) : (
                      <Unlock className="h-4 w-4 text-gray-400 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {page.draftStatus === 'draft' ? (
                      <Badge className="bg-amber-100 text-amber-800">Draft</Badge>
                    ) : (
                      <Badge className="bg-emerald-100 text-emerald-800">Published</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {page.lastModified ? new Date(page.lastModified).toLocaleString() : '—'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      {page.hasEnglish && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingPage({ slug: page.slug, locale: 'en' })}
                          title="Edit English"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          EN
                        </Button>
                      )}
                      {page.hasDutch && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingPage({ slug: page.slug, locale: 'nl' })}
                          title="Edit Dutch"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          NL
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSeoPage(page.slug)}
                        title="Add SEO & Meta"
                      >
                        <Globe className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSecurityPage(page.slug)}
                        title="Security Scan"
                      >
                        <Shield className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No pages found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};
