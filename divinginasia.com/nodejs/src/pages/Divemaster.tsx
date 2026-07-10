import Contact from '../components/Contact';

import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const imageList = [
  '/images/photo-1613853250147-2f73e55c1561.avif',
  '/images/photo-1618865181016-a80ad83a06d3.avif',
  '/images/photo-1647825194145-2d94e259c745.avif',
  '/images/photo-1659518893171-b15e20a8e201.avif',
  '/images/photo-1682686580849-3e7f67df4015.avif',
  '/images/photo-1682687982423-295485af248a.avif',
  '/images/turtle.avif',
];

const Divemaster: React.FC = () => {
  const navigate = useNavigate();
  const randomImage = useMemo(() => {
    return imageList[Math.floor(Math.random() * imageList.length)];
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${randomImage}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">PADI Divemaster Course</h1>
          <p className="mt-4 max-w-2xl">Begin your professional diving career — learn leadership, supervision, and dive management skills to work as a dive professional worldwide.</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => navigate('/booking')}>Enquire About Divemaster</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
            <p className="mb-6">The Divemaster program develops your dive leadership skills including supervising dive activities, assisting instructors, and guiding certified divers. This course combines knowledge development, water skills and stamina exercises, and practical experience.</p>

            <h3 className="text-xl font-semibold mb-3">Key competencies</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Supervising dive operations and safety</li>
              <li>Search and recovery, boat operations, and briefings</li>
              <li>Assisting instructors during training</li>
              <li>Customer service and dive center procedures</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Duration & Prerequisites</h3>
            <p className="mb-6">Typical program length: 2-4 weeks depending on experience. Prerequisites: Rescue Diver certification, 40 logged dives to start and 60 to certify (PADI requirements).</p>

            <h3 className="text-xl font-semibold mb-3">What we provide</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Supervised dive practicals and real-world guide experience</li>
              <li>Mentoring and job placement assistance</li>
              <li>Course materials and PADI registration</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">FAQ</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Will I get work after certification?</CardTitle>
                </CardHeader>
                <CardContent>
                  We assist graduates with local work placements, CV advice and introductions to partner centers.
                </CardContent>
              </Card>
            </div>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>Pro Level</Badge>
                </div>
                <CardDescription>2-4 weeks · Practical & theory · PADI Divemaster</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿35,000+</p>
                <p className="text-sm text-muted-foreground mb-4">Price varies by program length and experience level. Contact us for tailored pricing.</p>
                <Button onClick={() => navigate('/booking')}>Enquire / Apply</Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">How to apply</h3>
          <p className="mb-4">Send us your diving resume and preferred start date. We will assess experience and recommend a schedule.</p>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Get in touch to book/enquire</a>
            <div className="text-muted-foreground text-sm mb-4">Or use the form below to send a booking request directly.</div>
          </div>
          <Button onClick={() => navigate('/booking')}>Send Booking Request</Button>
        </section>
      </main>
        <Contact />
    </div>
  );
};

export default Divemaster;
