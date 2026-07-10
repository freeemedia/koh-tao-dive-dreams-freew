import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ScubaReview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/photo-1618865181016-a80ad83a06d3.avif')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">Scuba Review Course</h1>
          <p className="mt-4 max-w-2xl">Refresh your scuba diving skills and knowledge with our comprehensive review course.</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => navigate('/booking')}>Book Scuba Review</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="mb-6">The Scuba Review course is designed for certified divers who want to refresh their skills, update their knowledge, or prepare for advanced training. This course covers essential scuba diving principles, safety procedures, and practical skills to ensure you're confident and competent underwater.</p>

            <h3 className="text-xl font-semibold mb-3">What You'll Review</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Scuba equipment assembly and maintenance</li>
              <li>Dive planning and emergency procedures</li>
              <li>Buoyancy control and trim</li>
              <li>Underwater communication and navigation</li>
              <li>Decompression theory and safety stops</li>
              <li>Marine life identification and conservation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Who Should Take This Course</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Divers who haven't been diving recently</li>
              <li>Those preparing for advanced courses</li>
              <li>Divers wanting to improve their skills</li>
              <li>Anyone needing a confidence boost</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Course Benefits</h3>
            <p className="mb-6">This course helps you maintain proficiency, learn about equipment updates, and stay current with diving best practices. It's also an excellent way to meet continuing education requirements.</p>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>Review Course</Badge>
                </div>
                <CardDescription>1-2 days · Theory & practical review</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿2,500</p>
                <p className="text-sm text-muted-foreground mb-4">Includes review materials and supervised practice dives</p>
                <Button onClick={() => navigate('/booking')}>Book Review Course</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ScubaReview;