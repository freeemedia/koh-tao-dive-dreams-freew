import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function InstructorInternship() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Instructor Internship</h1>
          <p className="text-xl text-gray-600">
            Advanced Professional Development Program • Koh Tao, Thailand
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">All-Inclusive PADI Dive Instructor Internship</h2>
          <p className="text-gray-700 mb-4">
            Step into a career as a PADI Dive Instructor with our comprehensive internship program. Designed for skilled divers ready to teach others and lead diving operations professionally.
          </p>
          <p className="text-gray-700 mb-4">
            Our Instructor Internship builds upon your Divemaster foundation with advanced teaching methodologies, student management, and business skills.
          </p>
          <p className="text-gray-700">
            Graduates are equipped to work anywhere in the world and are highly sought after by dive operations, resorts, and liveaboards.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Become a PADI Dive Instructor</h2>
          <p className="text-gray-700 mb-4">
            Our Instructor Internship is a comprehensive personalized program designed to produce highly qualified, confident PADI Dive Instructors.
          </p>
          <p className="text-gray-700 mb-4">
            You will master teaching techniques, develop effective communication with students, perfect demonstration skills, and understand business management in the diving industry.
          </p>
          <p className="text-gray-700">
            As an instructor, you'll inspire divers, build confidence in underwater skills, and become an ambassador for ocean conservation.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">The Making of a Professional Dive Instructor</h2>
          <p className="text-gray-700 mb-4">
            A PADI Dive Instructor must possess exceptional skills both in and out of the water. You will develop:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Expert underwater demonstration abilities</li>
            <li>Outstanding teaching and communication skills</li>
            <li>Strong leadership and business acumen</li>
            <li>Deep knowledge of diving physics and physiology</li>
            <li>Unwavering commitment to safety and professionalism</li>
            <li>Passion for marine education and conservation</li>
            <li>Problem-solving and decision-making expertise</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">PADI Courses Included</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>PADI Divemaster Course (if not already certified)</li>
            <li>PADI Assistant Instructor Course</li>
            <li>PADI Open Water Instructor Course</li>
            <li>PADI Specialty Instructor Courses (selected specialties)</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">PADI Materials & Equipment Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold mb-3">Instructor Materials</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>PADI Instructor Manual</li>
                <li>Instructor Digital KIT</li>
                <li>Lesson Plan Documents</li>
                <li>Student Development Records</li>
                <li>Teaching Presentation Slides</li>
                <li>Digital References Library</li>
                <li>Instructor Publications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Professional Equipment</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>Instructor-Grade Compass</li>
                <li>Professional DSMB & Spool</li>
                <li>Underwater Slate & Pencils</li>
                <li>Whistle & Signal Devices</li>
                <li>Instructor T-shirt & Gear</li>
                <li>Cutting Tool Set</li>
                <li>Rescue Breathing Mask (Advanced)</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            All scuba equipment rental included. PADI Membership, instructor certification, diving medical, and insurance covered.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Instructor Internship Specializations</h2>
          <p className="text-gray-700 mb-4">
            Choose to specialize in peak performance areas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded p-3 bg-blue-50">
              <h3 className="font-semibold mb-2">Technical Diving Specialization</h3>
              <p className="text-sm text-gray-700">Deep, wreck, sidemount, and solo diving instruction</p>
            </div>
            <div className="border rounded p-3 bg-green-50">
              <h3 className="font-semibold mb-2">Conservation Specialization</h3>
              <p className="text-sm text-gray-700">Environmental education and marine protection focus</p>
            </div>
            <div className="border rounded p-3 bg-blue-50">
              <h3 className="font-semibold mb-2">Youth Specialization</h3>
              <p className="text-sm text-gray-700">Teaching Juniors and building future divers</p>
            </div>
            <div className="border rounded p-3 bg-green-50">
              <h3 className="font-semibold mb-2">Business Specialization</h3>
              <p className="text-sm text-gray-700">Dive operation management and entrepreneurship</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Instructor Internship Extras</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Advanced Buoyancy Workshop</h3>
              <p className="text-gray-700 text-sm">
                Levels 1-4 included to perfect your demonstration of all buoyancy techniques for teaching purposes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">REACT Conservation Program</h3>
              <p className="text-gray-700 text-sm">
                Advanced reef ecology training with certification to teach conservation specialty courses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Teaching Methodology Workshop</h3>
              <p className="text-gray-700 text-sm">
                Develop effective communication, student engagement, and classroom presentation skills.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dive Operation Management</h3>
              <p className="text-gray-700 text-sm">
                Learn the business side: equipment maintenance, staff management, safety protocols, and regulatory compliance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Professional Development</h3>
              <p className="text-gray-700 text-sm">
                Resume building, interview preparation, and global employment networking.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Internship Package Pricing</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Non-divemaster (all courses)</span>
              <span className="text-2xl font-bold text-blue-600">฿129,500</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-700">Already PADI Divemaster</span>
              <span className="text-2xl font-bold text-blue-600">฿79,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Already Assistant Instructor</span>
              <span className="text-2xl font-bold text-blue-600">฿59,500</span>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Program Details</h2>
          <p className="text-gray-700 mb-4">
            We maintain the highest instructor standards, ensuring you're prepared to teach at any dive operation worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Duration</h3>
              <p className="text-gray-700">6-12 weeks depending on starting level and specialization</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Minimum Requirement</h3>
              <p className="text-gray-700">100+ logged dives (training included)</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Career Opportunities</h2>
          <p className="text-gray-700 mb-4">
            PADI Dive Instructors are in high demand globally:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">• Dive Centers & Resorts:</span> Lead courses and recreational dives</li>
            <li><span className="font-semibold">• Liveaboard Vessels:</span> Conduct technical and specialty training</li>
            <li><span className="font-semibold">• Tourism Industry:</span> Guide and educate international guests</li>
            <li><span className="font-semibold">• Research Institutions:</span> Support marine science expeditions</li>
            <li><span className="font-semibold">• Conservation Organizations:</span> Lead education initiatives</li>
            <li><span className="font-semibold">• Self-Employment:</span> Start your own dive operation</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Why Choose Our Instructor Internship?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Proven track record of producing world-class instructors</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Expert mentoring from Master Instructors and Course Directors</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Specialized teaching focusing on personalized development</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Flexible programs with specialization options</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Global employment support and networking</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Beautiful island location with world-class dive sites</span>
            </li>
          </ul>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Ready to Become a PADI Dive Instructor?</h2>
          <p className="text-gray-700 mb-4">Transform your passion for diving into a global career as a certified PADI Dive Instructor.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=instructor-internship')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
