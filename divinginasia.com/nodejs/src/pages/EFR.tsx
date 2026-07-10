import Contact from '../components/Contact';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const EFR: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-64 md:h-80 flex items-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/efr.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-3xl md:text-4xl font-bold">Emergency First Response (EFR)</h1>
          <p className="mt-3 max-w-2xl">Learn essential first aid, CPR and emergency response skills — a valuable standalone certification and prerequisite for Rescue Diver.</p>
          <div className="mt-5">
            <Button size="lg" onClick={() => navigate('/booking')}>Book EFR</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="mb-6">EFR covers Primary and Secondary Care, CPR, AED use and first aid for common diving injuries. The course is classroom and practical skills oriented and is essential for anyone progressing to Rescue Diver.</p>

            <h3 className="text-xl font-semibold mb-3">What you'll learn</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Primary & secondary care principles</li>
              <li>CPR and AED operation</li>
              <li>First aid for breathing and cardiac emergencies</li>
              <li>First aid for diving-related incidents</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3">Duration & Prerequisites</h3>
            <p className="mb-6">Duration: 1 day. No diving prerequisite — suitable for divers and non-divers alike.</p>

            <h3 className="text-xl font-semibold mb-3">Inclusions</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Course materials and certification</li>
              <li>Practical CPR and first aid training</li>
              <li>Experienced instructors</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">FAQ</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Is EFR required for Rescue Diver?</CardTitle>
                </CardHeader>
                <CardContent>
                  Yes — EFR (or equivalent) is a prerequisite for the Rescue Diver course.
                </CardContent>
              </Card>
            </div>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>First Aid</Badge>
                </div>
                <CardDescription>1 day · Certification included</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿3,500</p>
                <p className="text-sm text-muted-foreground mb-4">Includes materials & certification</p>
                <Button onClick={() => navigate('/booking')}>Book EFR</Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Booking</h3>
          <p className="mb-4">Complete the form below to secure your place. We run EFR courses regularly — contact us for private dates.</p>
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

export default EFR;
