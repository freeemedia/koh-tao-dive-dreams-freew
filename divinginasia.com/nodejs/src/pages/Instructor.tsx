import Contact from '../components/Contact';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Instructor: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/photo-1682686580849-3e7f67df4015.avif')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">PADI Open Water Scuba Instructor</h1>
          <p className="mt-4 max-w-2xl">Train to become a PADI Instructor and teach divers worldwide. The Instructor Development Course (IDC) prepares candidates to lead courses and certify students.</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => navigate('/booking')}>Enquire About Instructor</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
            <p className="mb-6">The Instructor pathway trains experienced divers to teach and certify new divers. The IDC includes teaching presentations, student evaluations and practical teaching experience with support from experienced staff instructors.</p>

            <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
            <p className="mb-6">Prerequisite: PADI Divemaster (or equivalent), current EFR, and a minimum number of logged dives as required by PADI. Candidates must complete Instructor exams and assessments.</p>

            <h3 className="text-xl font-semibold mb-3">What you'll learn</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Teaching and presentation skills</li>
              <li>Course management and student evaluation</li>
              <li>Risk management and leadership</li>
              <li>Marketing and business development for instructors</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Inclusions</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>IDC materials and PADI registration</li>
              <li>Practical teaching sessions and mentoring</li>
              <li>Exam preparation and exam fees (where applicable)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">FAQ</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>How long is the IDC?</CardTitle>
                </CardHeader>
                <CardContent>
                  IDC schedules vary; typical programs run 2-4 weeks including evaluation days. Contact us for current schedules.
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
                <CardDescription>IDC · Instructor Examination · Practical Teaching</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿60,000+</p>
                <p className="text-sm text-muted-foreground mb-4">Contact us for a tailored Instructor pathway and exam dates.</p>
                <Button onClick={() => navigate('/booking')}>Enquire / Apply</Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Next steps</h3>
          <p className="mb-4">Send your diving resume and preferred start dates. We'll guide you through IDC prerequisites, schedules and placement opportunities.</p>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <a href="/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Get in touch to book/enquire</a>
            <div className="text-muted-foreground text-sm mb-4">Or use the form below to send a booking request directly.</div>
          </div>
          <Button onClick={() => navigate('/booking')}>Send Booking Request</Button>
        </section>
      </main>
        <Contact />
    </div>
  );
};

export default Instructor;
