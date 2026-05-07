import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: { home: 'Home', funDiving: 'Fun Diving', packages: 'Packages', contact: 'Contact', bookNow: 'Book Now' },
      hero: {
        title: 'Dive Nusa Lembongan',
        sub: 'Crystal clear waters, manta rays & vibrant reefs — just a boat ride away.',
        cta: 'See Packages',
        cta2: 'Book a Fun Dive',
      },
      funDiving: {
        title: 'Fun Diving',
        sub: 'Explore world-class dive sites with our experienced guides.',
        single: 'Single Fun Dive',
        pack5: '5-Dive Pack',
        pack10: '10-Dive Pack',
        includes: 'Includes: equipment, guide, boat',
      },
      packages: {
        title: 'Dive Packages',
        sub: 'Best value packages for your Lembongan dive holiday.',
        earlyBird: '🌅 Early Bird — Book 7+ days ahead & save 10%',
      },
      booking: {
        title: 'Book Now',
        name: 'Full Name', email: 'Email', phone: 'Phone / WhatsApp',
        date: 'Preferred Date', divers: 'Number of Divers',
        type: 'Dive Type', message: 'Message (optional)',
        submit: 'Send Booking Request', sending: 'Sending…',
        success: 'Booking request sent! We\'ll confirm via WhatsApp.',
        error: 'Something went wrong. Please try WhatsApp instead.',
      },
      contact: {
        title: 'Contact Us',
        sub: 'We\'re based on Nusa Lembongan. Get in touch!',
        whatsapp: 'Chat on WhatsApp',
        email: 'Email Us',
      },
    },
  },
  nl: {
    translation: {
      nav: { home: 'Home', funDiving: 'Duiken', packages: 'Pakketten', contact: 'Contact', bookNow: 'Boek Nu' },
      hero: {
        title: 'Duik in Nusa Lembongan',
        sub: 'Kristalhelder water, mantaroggen en levendige riffen — op een steenworp afstand.',
        cta: 'Bekijk Pakketten',
        cta2: 'Boek een Duik',
      },
      funDiving: {
        title: 'Recreatief Duiken',
        sub: 'Verken wereldklasse duiklocaties met onze ervaren gidsen.',
        single: 'Enkel Duik',
        pack5: '5-Duik Pakket',
        pack10: '10-Duik Pakket',
        includes: 'Inclusief: uitrusting, gids, boot',
      },
      packages: {
        title: 'Duikpakketten',
        sub: 'Beste waarde pakketten voor jouw Lembongan duikvakantie.',
        earlyBird: '🌅 Vroegboeker — Boek 7+ dagen van tevoren & bespaar 10%',
      },
      booking: {
        title: 'Boek Nu',
        name: 'Volledige Naam', email: 'E-mail', phone: 'Telefoon / WhatsApp',
        date: 'Gewenste Datum', divers: 'Aantal Duikers',
        type: 'Duiktype', message: 'Bericht (optioneel)',
        submit: 'Boekingsverzoek Sturen', sending: 'Versturen…',
        success: 'Boekingsverzoek verstuurd! We bevestigen via WhatsApp.',
        error: 'Er ging iets mis. Probeer WhatsApp.',
      },
      contact: {
        title: 'Contact',
        sub: 'We zijn gevestigd op Nusa Lembongan. Neem contact op!',
        whatsapp: 'WhatsApp Chatten',
        email: 'E-mail Sturen',
      },
    },
  },
  ru: {
    translation: {
      nav: { home: 'Главная', funDiving: 'Дайвинг', packages: 'Пакеты', contact: 'Контакты', bookNow: 'Забронировать' },
      hero: {
        title: 'Дайвинг на Нуса-Лембонган',
        sub: 'Кристально чистая вода, манты и яркие рифы — совсем рядом.',
        cta: 'Смотреть пакеты',
        cta2: 'Забронировать дайв',
      },
      funDiving: {
        title: 'Рекреационный дайвинг',
        sub: 'Исследуйте лучшие дайв-сайты с опытными гидами.',
        single: 'Один дайв',
        pack5: 'Пакет 5 дайвов',
        pack10: 'Пакет 10 дайвов',
        includes: 'Включает: снаряжение, гид, лодка',
      },
      packages: {
        title: 'Дайв-пакеты',
        sub: 'Лучшие пакеты для вашего отдыха на Лембонган.',
        earlyBird: '🌅 Ранняя бронь — Бронируйте за 7+ дней и экономьте 10%',
      },
      booking: {
        title: 'Забронировать',
        name: 'Полное имя', email: 'Эл. почта', phone: 'Телефон / WhatsApp',
        date: 'Желаемая дата', divers: 'Количество дайверов',
        type: 'Тип дайвинга', message: 'Сообщение (необязательно)',
        submit: 'Отправить запрос', sending: 'Отправка…',
        success: 'Запрос отправлен! Мы подтвердим через WhatsApp.',
        error: 'Что-то пошло не так. Попробуйте WhatsApp.',
      },
      contact: {
        title: 'Контакты',
        sub: 'Мы находимся на Нуса-Лембонган. Свяжитесь с нами!',
        whatsapp: 'Написать в WhatsApp',
        email: 'Написать на почту',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
