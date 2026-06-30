import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const ScubaReviewEn: React.FC = () => {
  return (
      <CoursePageTemplate
        pageSlug="scuba-review"
        locale="en"
        fallbackContent={{
          hero_title: 'Scuba Review Course',
          hero_subtitle: 'Refresh your scuba skills and confidence with our complete refresher program.',
          course_overview: 'The Scuba Review course is designed for certified divers who want to refresh skills, update knowledge, or prepare for advanced training. It covers core dive principles, safety procedures, and practical drills so you can return to the water with confidence.',
          price_thb: '2500',
          duration: '1-2 days',
        }}
        heroImage="/images/scuba-review.png"
        images={["/images/scubareview.png"]}
        level="Refresher"
        bookingItemName="Scuba Review Course"
        sections={[
        {
          title: "What you'll review",
          content: [
            'Scuba equipment setup and care',
            'Dive planning and emergency procedures',
            'Buoyancy and trim control',
            'Underwater communication and navigation',
            'Decompression theory and safety stops',
            'Environmental awareness and marine-life respect',
          ],
        },
        {
          title: 'Who this is for',
          content: [
            'Divers who have not dived recently',
            'Divers preparing for advanced courses',
            'Divers wanting to sharpen core skills',
            'Anyone wanting more confidence in the water',
          ],
        },
        {
          title: 'Course benefits',
          content: 'This refresher helps keep your diving skills current, updates you on equipment and best practices, and is a great way to meet prerequisites for follow-up training.',
        },
      ]}
    />
  );
};

export default ScubaReviewEn;