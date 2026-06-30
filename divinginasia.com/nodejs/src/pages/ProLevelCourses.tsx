import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProLevelCourses: React.FC = () => {
  const navigate = useNavigate();
  const courses = [
    { title: 'PADI Divemaster Course', path: '/courses/divemaster' },
    { title: 'PADI Instructor Course', path: '/courses/instructor' },
    { title: 'EFR Instructor Course' },
    { title: 'PADI MSDT Program' },
    { title: 'IDC Staff Instructor' },
    { title: 'PADI IDC Schedule' },
    { title: 'Instructor Specialties' },
    { title: 'AWARE Fish ID' },
    { title: 'Boat Instructor' },
    { title: 'Deep Instructor' },
    { title: 'DPV Instructor' },
    { title: 'Emergency O2 Provider' },
    { title: 'Equipment Instructor' },
    { title: 'Night Diving Instructor' },
    { title: 'Nitrox Instructor' },
    { title: 'Search & Recovery' },
    { title: 'Self Reliant Instructor' },
    { title: 'Sidemount Instructor' },
    { title: 'Underwater Naturalist' },
    { title: 'Underwater Navigator' },
    { title: 'Wreck Instructor' },
    { title: 'MSDT Instructor Specialty courses Koh Tao - Sidemount' },
  ];

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Pro Level Courses & Instructor Specialties</h1>
          <p className="text-lg text-muted-foreground mb-10">Professional training programs and instructor specialty courses available on Koh Tao. Click a course to view details or enquire.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, idx) => (
              <Card key={idx} className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Professional development and instructor-level specialty training.</CardDescription>
                  <div className="flex gap-3">
                    {c.path ? (
                      <Link to={c.path} className="flex-1">
                        <Button variant="outline" className="w-full">View</Button>
                      </Link>
                    ) : (
                      <Link to={`/courses/specialties/${slugify(c.title)}`} className="flex-1">
                        <Button variant="outline" className="w-full">View</Button>
                      </Link>
                    )}

                    <Button className="w-full flex-1" onClick={() => navigate('/booking')}>Enquire</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Enquire / Book a Pro Course</h2>
            <p className="text-muted-foreground mb-6">Complete the form below and we'll reply with availability and pricing.</p>
            <Button onClick={() => navigate('/booking')}>Go to booking page</Button>
          </section>
        </div>
      </section>
    </div>
  );
};

export default ProLevelCourses;
