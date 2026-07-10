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

const Rescue: React.FC = () => {
  const navigate = useNavigate();
  const randomImage = useMemo(() => {
    return imageList[Math.floor(Math.random() * imageList.length)];
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${randomImage}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">PADI Rescue Diver</h1>
          <p className="mt-4 max-w-2xl">Develop the skills and confidence to manage dive emergencies and assist others. The Rescue Diver course is an important step for all serious divers.</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => navigate('/booking')}>Book Rescue</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="mb-6">The Rescue Diver course teaches you to prevent and manage diving emergencies, perform rescues and work confidently as part of a dive team.</p>

            <h3 className="text-xl font-semibold mb-3">Skills covered</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Self-rescue and diver stress recognition</li>
              <li>Rescue scenarios and techniques</li>
              <li>Emergency management and equipment</li>
              <li>Rescue breathing and casualty care</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Structure & Prerequisites</h3>
            <p className="mb-6">Duration: Typically 3 days including pool and open water sessions. Prerequisite: EFR (or equivalent) and Open Water certification.</p>

            <h3 className="text-xl font-semibold mb-3">Inclusions</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Course materials and certification</li>
              <li>Rescue skills training in pool and open water</li>
              <li>All equipment rental</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">FAQ</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Is Rescue difficult?</CardTitle>
                </CardHeader>
                <CardContent>
                  The course is challenging but instructors support you step-by-step. Good fitness and comfort in the water help.
                </CardContent>
              </Card>
            </div>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>Advanced</Badge>
                </div>
                <CardDescription>3 days · Pool & open water · Certification</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿10,500</p>
                <p className="text-sm text-muted-foreground mb-4">Includes EFR prerequisite if required</p>
                <Button onClick={() => navigate('/booking')}>Book Rescue</Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Booking</h3>
          <p className="mb-4">Complete the booking form below to reserve your place. Rescue courses are scheduled regularly — contact us for private sessions.</p>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Get in touch to book/enquire</a>
            <div className="text-muted-foreground text-sm mb-4">Or use the form below to send a booking request directly.</div>
          </div>
          <Button onClick={() => navigate('/booking')}>Send Booking Request</Button>
        </section>
        <Contact />
      </main>
    </div>
  );
};

export default Rescue;
