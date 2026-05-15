import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const ProLevelCourses: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = {
    page_title: isDutch
      ? 'Pro Level Cursussen & Instructor-specialties'
      : 'Pro Level Courses & Instructor Specialties',
    page_subtitle: isDutch
      ? 'Professionele trainingsprogramma\'s en instructor-specialtycursussen op Koh Tao. Klik op een cursus voor details of informatie.'
      : 'Professional training programs and instructor specialty courses available on Koh Tao. Click a course to view details or enquire.',
    card_description: isDutch
      ? 'Professionele ontwikkeling en specialtytraining op instructeursniveau.'
      : 'Professional development and instructor-level specialty training.',
    view_button: isDutch ? 'Bekijken' : 'View',
    enquire_button: isDutch ? 'Informatie' : 'Enquire',
    footer_title: isDutch ? 'Informatie / Boek een pro-cursus' : 'Enquire / Book a Pro Course',
    footer_body: isDutch
      ? 'Vul het formulier in en wij reageren met beschikbaarheid en prijzen.'
      : "Complete the form below and we'll reply with availability and pricing.",
    footer_cta: isDutch ? 'Naar boekingspagina' : 'Go to booking page',
    courses_list: isDutch
      ? 'PADI Divemaster-cursus|/courses/divemaster\nPADI Instructor-cursus|/courses/instructor\nEFR Instructor-cursus\nPADI MSDT-programma|/courses/msdt-program\nIDC Staff Instructor\nPADI IDC-schema\nInstructor-specialties\nAWARE Fish ID\nBoot Instructor\nDeep Instructor\nDPV Instructor\nEmergency O2 Provider\nEquipment Instructor\nNight Diving Instructor\nNitrox Instructor\nSearch & Recovery\nSelf Reliant Instructor\nSidemount Instructor\nUnderwater Naturalist\nUnderwater Navigator\nWreck Instructor\nMSDT Instructor Specialty-cursussen Koh Tao - Sidemount'
      : 'PADI Divemaster Course|/courses/divemaster\nPADI Instructor Course|/courses/instructor\nEFR Instructor Course\nPADI MSDT Program|/courses/msdt-program\nIDC Staff Instructor\nPADI IDC Schedule\nInstructor Specialties\nAWARE Fish ID\nBoat Instructor\nDeep Instructor\nDPV Instructor\nEmergency O2 Provider\nEquipment Instructor\nNight Diving Instructor\nNitrox Instructor\nSearch & Recovery\nSelf Reliant Instructor\nSidemount Instructor\nUnderwater Naturalist\nUnderwater Navigator\nWreck Instructor\nMSDT Instructor Specialty courses Koh Tao - Sidemount',
  };

  const { content } = usePageContent({
    pageSlug: 'pro-level-courses',
    locale,
    fallbackContent,
  });

  const courses = String(content.courses_list || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [titleRaw, pathRaw] = line.split('|');
      return {
        title: String(titleRaw || '').trim(),
        path: String(pathRaw || '').trim(),
      };
    });

  // Utility to create URL-friendly slugs from course titles
  function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')      // Remove all non-word chars
      .replace(/--+/g, '-')            // Replace multiple - with single -
      .replace(/(^-|-$)/g, '');        // Trim - from start/end
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">{content.page_title}</h1>
          <p className="text-lg text-muted-foreground mb-10">{content.page_subtitle}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, idx) => (
              <Card key={idx} className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{content.card_description}</CardDescription>
                  <div className="flex gap-3">
                    {c.path ? (
                      <Link to={c.path} className="flex-1">
                        <Button variant="outline" className="w-full">{content.view_button}</Button>
                      </Link>
                    ) : (
                      <Link to={`/courses/specialties/${slugify(c.title)}`} className="flex-1">
                        <Button variant="outline" className="w-full">{content.view_button}</Button>
                      </Link>
                    )}

                    <Button className="w-full flex-1" onClick={() => window.open('/booking', '_blank')}>{content.enquire_button}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4">{content.footer_title}</h2>
            <p className="text-muted-foreground mb-6">{content.footer_body}</p>
            <Button onClick={() => window.open('/booking', '_blank')}>{content.footer_cta}</Button>
          </section>
        </div>
      </section>
    </div>
  );
};

export default ProLevelCourses;
