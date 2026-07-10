import Contact from '../components/Contact';

import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import ImageRow from '@/components/ImageRow';

const imageList = [
  '/images/photo-1613853250147-2f73e55c1561.avif',
  '/images/photo-1618865181016-a80ad83a06d3.avif',
  '/images/photo-1647825194145-2d94e259c745.avif',
  '/images/photo-1659518893171-b15e20a8e201.avif',
  '/images/photo-1682686580849-3e7f67df4015.avif',
  '/images/photo-1682687982423-295485af248a.avif',
  '/images/turtle.avif',
];

const OpenWater: React.FC = () => {
  const navigate = useNavigate();
  const randomImage = useMemo(() => {
    return imageList[Math.floor(Math.random() * imageList.length)];
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${randomImage}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">PADI Open Water Course</h1>
          <p className="mt-4 max-w-2xl">The PADI Open Water Diver course is the world's most popular scuba course. Learn the fundamentals of scuba diving and get certified to dive independently with a buddy, to 18 metres/60 feet.</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => navigate('/booking')}>Book Open Water</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <ImageRow images={["/images/photo-1659518893171-b15e20a8e201.avif","/images/photo-1682686580849-3e7f67df4015.avif","/images/photo-1647825194145-2d94e259c745.avif"]} />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="mb-6">The Open Water course combines knowledge development, confined water dives (pool) and open water dives. You'll learn equipment setup, basic underwater skills, buoyancy control and dive planning. Our instructors keep groups small and emphasize safety and fun.</p>

            <h3 className="text-xl font-semibold mb-3">What you'll learn</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Equipment assembly and use</li>
              <li>Buoyancy control and breathing techniques</li>
              <li>Underwater navigation basics</li>
              <li>Emergency procedures and surface recognition</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3">Course Structure</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Duration: 3-4 days (flexible scheduling)</li>
              <li>Theory sessions + confined water training</li>
              <li>4 open water dives</li>
              <li>Minimum age: 10 years (Junior Open Water for 10-14)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Inclusions</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>PADI course materials and certification</li>
              <li>All scuba equipment rental</li>
              <li>Pool and open water training</li>
              <li>Boat fees where applicable</li>
              <li>Tea, coffee and bottled water</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Do I need prior experience?</CardTitle>
                </CardHeader>
                <CardContent>
                  No prior scuba experience is required — the course starts from the basics.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Is the course safe?</CardTitle>
                </CardHeader>
                <CardContent>
                  Yes. We use small groups, experienced PADI instructors and modern equipment. Safety briefings are given before every session.
                </CardContent>
              </Card>
            </div>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>Beginner</Badge>
                </div>
                <CardDescription>3-4 days · 4 open water dives · Certification included</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿12,900</p>
                <p className="text-sm text-muted-foreground mb-4">Includes materials & equipment</p>
                <ul className="text-sm mb-4">
                  <li>• Small groups</li>
                  <li>• Experienced PADI instructors</li>
                  <li>• Flexible start dates</li>
                </ul>
                <Button onClick={() => navigate('/booking')}>Book Now</Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Booking & Next Steps</h3>
          <p className="mb-4">To book, you can <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">get in touch</a> for an enquiry, or use the booking form at the bottom of this page to send a request directly. We'll confirm available dates and any prerequisites.</p>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Get in touch to book/enquire</a>
            <div className="text-muted-foreground text-sm mb-4">Or use the form below to send a booking request directly.</div>
          </div>
          <Button onClick={() => navigate('/booking')}>Send Booking Request</Button>
        </section>
      </main>
    </div>
  );
};

export default OpenWater;
