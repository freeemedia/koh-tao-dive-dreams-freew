// Shared modal state for Book Now buttons
import React, { useState } from 'react';
import BookNowModal from '@/components/BookNowModal';

export function useBookNowModal() {
  const [showBookNow, setShowBookNow] = useState(false);
  const BookNowModalComponent = (
    <BookNowModal open={showBookNow} onClose={() => setShowBookNow(false)} />
  );
  return { showBookNow, setShowBookNow, BookNowModalComponent };
}
