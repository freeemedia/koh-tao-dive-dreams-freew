import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const sampleEvents = [
  { title: 'Prepare dive gear', date: '2026-04-10' },
  { title: 'Contact guest', date: '2026-04-12' },
  { title: 'Update website', date: '2026-04-15' },
];

export default function TaskCalendar({ events = sampleEvents }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      height={400}
    />
  );
}
