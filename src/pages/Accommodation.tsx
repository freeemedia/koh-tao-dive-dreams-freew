import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { trackAffiliateClick } from '@/lib/affiliateTracking';
import { trackTripComAnalyticsEvent } from '@/lib/trackTripComAnalyticsEvent';

const TRIP_ALLIANCE_ID = import.meta.env.VITE_TRIP_ALLIANCE_ID as string | undefined;
const TRIP_SITE_ID = import.meta.env.VITE_TRIP_SITE_ID as string | undefined;
const STAY_URL_LABEL = '/stay';

type RoomCard = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  image: string;
  gallery: string[];
};

const Accommodation = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isDutch = i18n.language.startsWith('nl');

  const fallbackLabels = isDutch
    ? {
        heroTitle: 'Verblijf bij ons op Koh Tao',
        heroSubtitle:
          'Kies uit gezellige kamers, familiekamers en bungalows op toplocaties vlak bij onze duikactiviteiten.',
        viewRooms: 'Bekijk kamers',
        bookStay: 'Plan je verblijf',
        roomsTitle: 'Onze kamers',
        roomsIntro:
          'Of je nu een budgetvriendelijke kamer zoekt of een ruimere familiekamer, we helpen je graag met de beste match voor jouw reis.',
        pricingNote:
          'Prijzen variëren per seizoen. Neem contact op voor actuele beschikbaarheid en tarieven.',
        featuresTitle: 'Wat je kunt verwachten',
        whyStayTitle: 'Waarom bij ons verblijven?',
        whyStayBody:
          'Je verblijft dicht bij het duikcentrum, boten en restaurants. Dat betekent minder reistijd en meer tijd om van Koh Tao te genieten.',
        ctaTitle: 'Klaar om je verblijf te plannen?',
        ctaBody: 'Voeg accommodatie toe aan je duiktrip en stuur direct je aanvraag.',
        ctaButton: 'Stay with us at our resort accommodation',
        viewPictures: 'Bekijk foto\'s',
        close: 'Sluiten',
        chooseBooking: 'Kies je verblijf-optie',
        chooseBookingBody: 'Kies Stay With Us at Our Resort om hieronder je kamergegevens in te vullen.',
        bookOurAccommodation: 'Stay With Us at Our Resort',
        accommodationType: 'Accommodatietype',
        people: 'Aantal personen',
        nights: 'Aantal nachten',
        details: 'Extra details',
        divingWithUs: 'Duik je mee met ons?',
        divingYes: 'Ja, ik duik mee',
        divingNo: 'Nee, alleen verblijf',
        continueBooking: 'Ga verder naar verblijf formulier',
      }
    : {
        heroTitle: 'Stay With Us In Koh Tao',
        heroSubtitle:
          'Choose from cozy rooms, family-friendly suites, and bungalows in great locations close to our diving operations.',
        viewRooms: 'View Rooms',
        bookStay: 'Plan Your Stay',
        roomsTitle: 'Our Rooms',
        roomsIntro:
          'Whether you are looking for a budget-friendly room or more space for family travel, we can match you with the right option.',
        pricingNote:
          'Rates vary by season. Contact us for current availability and exact pricing.',
        featuresTitle: 'What To Expect',
        whyStayTitle: 'Why stay with us?',
        whyStayBody:
          'You stay close to the dive center, boats, and restaurants. Less travel time means more time enjoying Koh Tao.',
        ctaTitle: 'Ready to plan your stay?',
        ctaBody: 'Add accommodation to your dive trip and send your request directly.',
        ctaButton: 'Stay with us at our resort accommodation',
        viewPictures: 'View Pictures',
        close: 'Close',
        chooseBooking: 'Choose your stay option',
        chooseBookingBody: 'Choose Stay With Us at Our Resort to fill your room details below.',
        bookOurAccommodation: 'Stay With Us at Our Resort',
        accommodationType: 'Accommodation type',
        people: 'Number of people',
        nights: 'Number of nights',
        details: 'Additional details',
        divingWithUs: 'Diving with us?',
        divingYes: 'Yes, I am diving',
        divingNo: 'No, accommodation only',
        continueBooking: 'Continue to stay form',
      };

  const labels = fallbackLabels;

  const roomCards: RoomCard[] = isDutch
    ? [
        {
          name: 'Familie Bungalow (tot 5 personen)',
          price: 'THB 4,000 - 6,000 / nacht',
          desc: 'Ruime bungalow voor gezinnen of kleine groepen met comfortabele indeling.',
          features: ['Airco', 'Warme douche', 'Wi-Fi', 'TV', 'Tuinzicht'],
          image: '/images/accommodation/family-bungalow-1.jpeg',
          gallery: [
            '/images/accommodation/family-bungalow-1.jpeg',
            '/images/accommodation/family-bungalow-2.jpeg',
            '/images/accommodation/family-bungalow-3.jpeg',
          ],
        },
        {
          name: 'Basic Room (2 personen)',
          price: 'THB 1,450 - 1,650 / nacht',
          desc: 'Praktische en nette kamer voor koppels of duikbuddy’s die slim willen reizen.',
          features: ['Airco', 'Wi-Fi', 'Warme douche', 'Tuinzicht'],
          image: '/images/accommodation/basic-room-1.jpeg',
          gallery: [
            '/images/accommodation/basic-room-1.jpeg',
            '/images/accommodation/basic-room-2.jpeg',
            '/images/accommodation/basic-room-3.jpeg',
          ],
        },
        {
          name: 'Bungalow (2 personen)',
          price: 'THB 1,600 - 2,000 / nacht',
          desc: 'Rustige bungalow met meer privacy en korte toegang tot strand en centrum.',
          features: ['Airco', 'Wi-Fi', 'Tuinzicht', 'Privater gevoel'],
          image: '/images/accommodation/bungalow-1.jpeg',
          gallery: [
            '/images/accommodation/bungalow-1.jpeg',
            '/images/accommodation/bungalow-2.jpeg',
            '/images/accommodation/bungalow-3.jpeg',
          ],
        },
      ]
    : [
        {
          name: 'Family Bungalow (up to 5 guests)',
          price: 'THB 4,000 - 6,000 / night',
          desc: 'Spacious setup for families or small groups with a comfortable layout.',
          features: ['Air conditioning', 'Hot shower', 'Wi-Fi', 'TV', 'Garden view'],
          image: '/images/accommodation/family-bungalow-1.jpeg',
          gallery: [
            '/images/accommodation/family-bungalow-1.jpeg',
            '/images/accommodation/family-bungalow-2.jpeg',
            '/images/accommodation/family-bungalow-3.jpeg',
          ],
        },
        {
          name: 'Basic Room (2 guests)',
          price: 'THB 1,450 - 1,650 / night',
          desc: 'Clean, practical room for couples or dive buddies who want value.',
          features: ['Air conditioning', 'Wi-Fi', 'Hot shower', 'Garden view'],
          image: '/images/accommodation/basic-room-1.jpeg',
          gallery: [
            '/images/accommodation/basic-room-1.jpeg',
            '/images/accommodation/basic-room-2.jpeg',
            '/images/accommodation/basic-room-3.jpeg',
          ],
        },
        {
          name: 'Bungalow (2 guests)',
          price: 'THB 1,600 - 2,000 / night',
          desc: 'Quiet bungalow with extra privacy and easy access to beach and town.',
          features: ['Air conditioning', 'Wi-Fi', 'Garden view', 'More privacy'],
          image: '/images/accommodation/bungalow-1.jpeg',
          gallery: [
            '/images/accommodation/bungalow-1.jpeg',
            '/images/accommodation/bungalow-2.jpeg',
            '/images/accommodation/bungalow-3.jpeg',
          ],
        },
      ];

  const [selectedRoomName, setSelectedRoomName] = useState<string>('');
  const [selectedGallery, setSelectedGallery] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [showAltAccommodationPopup, setShowAltAccommodationPopup] = useState(false);
  const [bookingSource, setBookingSource] = useState<'our' | 'trip' | 'agoda' | ''>('');
  const [accommodationType, setAccommodationType] = useState<'family' | 'basic' | 'bungalow'>('family');
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [nightCount, setNightCount] = useState<number>(2);
  const [accommodationDetails, setAccommodationDetails] = useState<string>('');
  const [isDiving, setIsDiving] = useState<boolean | null>(null);

  const openRoomGallery = (room: RoomCard) => {
    setSelectedRoomName(room.name);
    setSelectedGallery(room.gallery);
    setSelectedPhoto(room.gallery[0] || room.image);
    setGalleryOpen(true);
  };

  const currentPhoto = useMemo(() => {
    if (!selectedPhoto && selectedGallery.length > 0) return selectedGallery[0];
    return selectedPhoto;
  }, [selectedPhoto, selectedGallery]);

  const openOurAccommodationForm = () => {
    setBookingSource('our');
    const formSection = document.getElementById('accommodation-booking-options');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openRoomsSection = () => {
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openAlternativeAccommodationPopup = (source: 'trip' | 'agoda') => {
    setBookingSource(source);
    setShowAltAccommodationPopup(true);
  };

  const buildTripUrl = () => {
    // Full affiliate deep link for Trip.com Koh Tao hotels
    const allianceId = TRIP_ALLIANCE_ID || '7864578';
    const siteId = TRIP_SITE_ID || '295439656';
    // You can make trip_sub1 and trip_sub3 dynamic if needed
    return `https://www.trip.com/hotels/list?city=19957&display=Koh%20Tao&optionId=19957&optionType=City&optionName=Koh%20Tao&Allianceid=${allianceId}&SID=${siteId}&trip_sub1=tao1&trip_sub3=D15055497`;
  };


  const handleExternalBooking = () => {
    if (bookingSource === 'agoda') {
      window.open('/agoda-hotels', '_blank', 'noopener,noreferrer');
    } else {
      const url = buildTripUrl();
      trackAffiliateClick({
        provider: 'trip',
        destinationUrl: url,
        placement: 'footer-link',
        hotelName: 'Trip.com - Accommodation Page',
        affiliateId: TRIP_ALLIANCE_ID || TRIP_SITE_ID || null,
      });
      trackTripComAnalyticsEvent(url);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setShowAltAccommodationPopup(false);
  };

  const handleStayWithResort = () => {
    // Close popup and open our accommodation form
    setShowAltAccommodationPopup(false);
    openOurAccommodationForm();
  };

  const continueToBookingForm = () => {
    const roomLabel = accommodationType === 'family'
      ? 'Family Bungalow'
      : accommodationType === 'basic'
        ? 'Basic Room'
        : 'Bungalow';
    const message =
      `Accommodation request: ${roomLabel}. Guests: ${peopleCount}. Nights: ${nightCount}. ` +
      `Diving: ${isDiving === true ? 'Yes' : isDiving === false ? 'No' : 'Not specified'}. ` +
      `Details: ${accommodationDetails || 'None'}`;
    const params = new URLSearchParams({
      accommodationType,
      people: String(peopleCount),
      nights: String(nightCount),
      message,
    });
    if (isDiving !== null) params.set('diving', isDiving ? 'yes' : 'no');
    navigate(`/stay?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="relative h-[65vh] min-h-[460px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/acc-head.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/25" />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex items-center">
          <div className="max-w-3xl text-white">
            <p className="uppercase tracking-[0.2em] text-sm text-blue-200 mb-4">Accommodation</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">{labels.heroTitle}</h1>
            <p className="mt-5 text-lg md:text-xl text-white/90">{labels.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#rooms" className="inline-block bg-background text-slate-900 px-5 py-3 rounded-md font-semibold hover:bg-slate-100 transition">
                {labels.viewRooms}
              </a>
              <Button onClick={openRoomsSection} className="bg-blue-600 hover:bg-blue-700 text-white">
                {STAY_URL_LABEL}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="accommodation-booking-options" className="max-w-6xl mx-auto px-4 py-10">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>{labels.chooseBooking}</CardTitle>
            <CardDescription>{labels.chooseBookingBody}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-6">
              <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={openOurAccommodationForm}>
                {STAY_URL_LABEL}
              </Button>
              <Button type="button" variant="outline" onClick={() => openAlternativeAccommodationPopup('trip')}>
                Trip.com
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => openAlternativeAccommodationPopup('agoda')}
              >
                Agoda
              </Button>
            </div>

            {bookingSource === 'our' && (
              <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg border bg-muted">
                <div>
                  <label htmlFor="accommodationType" className="block text-sm font-medium mb-2">{labels.accommodationType}</label>
                  <select
                    id="accommodationType"
                    title={labels.accommodationType}
                    value={accommodationType}
                    onChange={(e) => setAccommodationType(e.target.value as 'family' | 'basic' | 'bungalow')}
                    className="w-full h-10 rounded-md border px-3 bg-background"
                  >
                    <option value="family">Family Bungalow</option>
                    <option value="basic">Basic Room</option>
                    <option value="bungalow">Bungalow</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="peopleCount" className="block text-sm font-medium mb-2">{labels.people}</label>
                  <input
                    id="peopleCount"
                    title={labels.people}
                    type="number"
                    min={1}
                    max={20}
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full h-10 rounded-md border px-3 bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="nightCount" className="block text-sm font-medium mb-2">{labels.nights}</label>
                  <input
                    id="nightCount"
                    title={labels.nights}
                    type="number"
                    min={1}
                    max={60}
                    value={nightCount}
                    onChange={(e) => setNightCount(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full h-10 rounded-md border px-3 bg-background"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">{labels.divingWithUs}</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isDiving"
                        checked={isDiving === true}
                        onChange={() => setIsDiving(true)}
                        className="accent-blue-600"
                      />
                      {labels.divingYes}
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isDiving"
                        checked={isDiving === false}
                        onChange={() => setIsDiving(false)}
                        className="accent-blue-600"
                      />
                      {labels.divingNo}
                    </label>
                    {isDiving !== null && (
                      <button
                        type="button"
                        onClick={() => setIsDiving(null)}
                        className="text-xs text-slate-400 hover:text-slate-600 underline ml-2"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="accommodationDetails" className="block text-sm font-medium mb-2">{labels.details}</label>
                  <textarea
                    id="accommodationDetails"
                    title={labels.details}
                    rows={3}
                    value={accommodationDetails}
                    onChange={(e) => setAccommodationDetails(e.target.value)}
                    placeholder="Arrival date, room preferences, child bed request, etc."
                    className="w-full rounded-md border px-3 py-2 bg-background"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={continueToBookingForm}>
                    {labels.continueBooking}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section id="rooms" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{labels.roomsTitle}</h2>
        <p className="text-slate-600 max-w-3xl mb-2">{labels.roomsIntro}</p>
        <p className="text-sm text-slate-500 mb-8">{labels.pricingNote}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomCards.map((room) => (
            <Card key={room.name} className="overflow-hidden h-full border-slate-200">
              <img src={room.image} alt={room.name} className="h-44 w-full object-cover" />
              <CardHeader>
                <CardTitle className="text-xl">{room.name}</CardTitle>
                <CardDescription>{room.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{room.price}</Badge>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="border-slate-300 text-slate-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => openRoomGallery(room)}>
                    {labels.viewPictures}
                  </Button>
                  <Button type="button" className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => openRoomGallery(room)}>
                    {STAY_URL_LABEL}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>{labels.featuresTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>Air conditioning and fan options</li>
                <li>Wi-Fi in rooms and common areas</li>
                <li>Hot shower and private bathrooms on selected units</li>
                <li>Short distance to beach, dive shop, and restaurants</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>{labels.whyStayTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 text-sm">{labels.whyStayBody}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-3">{labels.ctaTitle}</h3>
          <p className="text-slate-300 mb-7">{labels.ctaBody}</p>
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={openOurAccommodationForm}
          >
            {labels.ctaButton}
          </Button>
        </div>
      </section>

      <AlertDialog open={showAltAccommodationPopup} onOpenChange={setShowAltAccommodationPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Staying elsewhere?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-sm text-slate-700">
                <p>No problem — but please let us know so we can arrange <strong>transport from your accommodation to our resort</strong> for your dives or courses.</p>
                <p>You can add your accommodation details in the booking form notes.</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={handleStayWithResort} className="mt-0">
              Actually, I'll stay at your resort
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleExternalBooking}>
              OK — Take me to {bookingSource === 'agoda' ? 'Agoda' : 'Trip.com'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-4xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRoomName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {currentPhoto && (
              <img src={currentPhoto} alt={selectedRoomName} className="w-full h-[420px] object-cover rounded-md" />
            )}
            <div className="grid grid-cols-3 gap-3">
              {selectedGallery.map((img) => (
                <button
                  key={img}
                  type="button"
                  className={`rounded-md overflow-hidden border-2 ${img === currentPhoto ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setSelectedPhoto(img)}
                >
                  <img src={img} alt={selectedRoomName} className="h-24 w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="text-right">
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setGalleryOpen(false);
                    openOurAccommodationForm();
                  }}
                >
                  {STAY_URL_LABEL}
                </Button>
                <Button type="button" variant="outline" onClick={() => setGalleryOpen(false)}>
                  {labels.close}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Accommodation;
