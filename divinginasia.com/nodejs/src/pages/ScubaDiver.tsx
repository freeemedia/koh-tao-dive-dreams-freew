import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ScubaDiver: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/photo-1618865181016-a80ad83a06d3.avif')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">PADI Scuba Diver Course</h1>
          <p className="mt-4 max-w-2xl">Experience the underwater world with confidence. The PADI Scuba Diver course is perfect for those who want to try scuba diving before committing to full certification.</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => navigate('/booking')}>Book Scuba Diver</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="mb-6">The PADI Scuba Diver course introduces you to the underwater world in a fun and relaxed way. You'll learn basic scuba diving skills and explore shallow reefs, giving you the confidence to continue your diving journey. This course serves as an introduction to scuba diving and can lead to full Open Water certification.</p>

            <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Basic scuba diving theory and physics</li>
              <li>Proper use of scuba equipment</li>
              <li>Fundamental diving skills and safety procedures</li>
              <li>Underwater communication and buddy system</li>
              <li>Shallow water exploration and reef appreciation</li>
              <li>Environmental awareness and marine conservation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Course Structure</h3>
            <p className="mb-6">The course includes classroom sessions, confined water training, and open water dives. You'll complete 2 open water dives in waters no deeper than 12 meters (40 feet), making it accessible for most people.</p>

            <h3 className="text-xl font-semibold mb-3">Why Choose Scuba Diver?</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Shorter commitment than full Open Water course</li>
              <li>Perfect introduction to scuba diving</li>
              <li>Can be upgraded to Open Water certification</li>
              <li>Fun and relaxed learning environment</li>
              <li>Explore beautiful Koh Tao reefs</li>
            </ul>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>Entry Level</Badge>
                </div>
                <CardDescription>2-3 days · Theory & practical</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿8,500</p>
                <p className="text-sm text-muted-foreground mb-4">Includes all training, equipment, and 2 open water dives</p>
                <Button onClick={() => navigate('/booking')}>Book Scuba Diver</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ScubaDiver;