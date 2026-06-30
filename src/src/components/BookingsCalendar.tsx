import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { nl } from 'date-fns/locale/nl';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface Booking {
  id: string;
  name: string;
  email: string;
  course_title: string;
  preferred_date?: string;
  status: string;
  phone?: string;
  deposit_amount?: number | null;
  total_amount?: number | null;
  created_at: string;
}

interface BookingsCalendarProps {
  bookings: Booking[];
}

const locales = {
  'en-US': enUS,
  nl,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BookingsCalendar: React.FC<BookingsCalendarProps> = ({ bookings }) => {
  const { i18n, t } = useTranslation();

  const events = useMemo(() => {
    return bookings
      .filter((b) => b.preferred_date)
      .map((b) => {
        const dateStr = b.preferred_date || '';
        const [year, month, day] = dateStr.split('-').map(Number);
        const eventDate = new Date(year, month - 1, day);

        return {
          id: b.id,
          title: `${b.name} - ${b.course_title}`,
          start: eventDate,
          end: eventDate,
          resource: {
            booking: b,
            status: b.status,
          },
        };
      });
  }, [bookings]);

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#3b82f6'; // default blue for pending

    if (event.resource?.status === 'confirmed') {
      backgroundColor = '#10b981'; // green
    } else if (event.resource?.status === 'cancelled') {
      backgroundColor = '#ef4444'; // red
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div style={{ height: '600px', marginBottom: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        culture={i18n.language.startsWith('nl') ? 'nl' : 'en-US'}
        messages={{
          today: t('calendar.today'),
          previous: t('calendar.back'),
          next: t('calendar.next'),
          month: t('calendar.month'),
          week: t('calendar.week'),
          day: t('calendar.day'),
          agenda: t('calendar.agenda'),
          date: t('calendar.date'),
          time: t('calendar.time'),
          event: t('calendar.event'),
          showMore: (total: number) => `+${total} ${t('calendar.showing')}`,
        }}
        popup
        views={['month', 'week', 'day']}
        defaultView="month"
      />
    </div>
  );
};

export default BookingsCalendar;
