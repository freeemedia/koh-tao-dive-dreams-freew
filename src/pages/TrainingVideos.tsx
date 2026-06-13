import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PlayCircle, ShieldCheck, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

type TrainingVideo = {
  title: string;
  description: string;
  level: string;
  duration: string;
  access: string;
};

const TrainingVideos: React.FC = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        badge: 'GRATIS TRAININGSVIDEOS',
        title: 'Video library voor pro-level training',
        subtitle:
          'Een compacte resource hub voor Divemaster- en Instructor-kandidaten, plus iedereen die zijn theoretische basis wil aanscherpen voor professionele duiktraining.',
        introTitle: 'Wat je hier vindt',
        introBody:
          "Deze pagina brengt de belangrijkste voorbereidingsthema's samen in een overzichtelijke structuur. De video's sluiten aan op pro-level opleidingen, lessen en briefingvaardigheden.",
        prepTitle: 'Voorbereiding voor professionals',
        prepBody:
          "Gebruik de video's als ondersteuning naast je cursusmateriaal, review ze voor lessen of instructies, en deel ze met studenten wanneer je extra uitleg wilt geven.",
        accessTitle: 'Toegang tot het materiaal',
        accessBody:
          "De volledige set is bedoeld als trainingsondersteuning voor cursisten en pro-programma's. Neem contact op als je wilt weten welke video's bij jouw traject horen.",
        ctaPrimary: 'Bekijk pro cursussen',
        ctaSecondary: 'Neem contact op',
        quickLinksTitle: 'Snelle links',
        quickLinksBody: "Handige routes naar de belangrijkste pro-level pagina's op de site.",
      }
    : {
        badge: 'FREE TRAINING VIDEOS',
        title: 'Video library for pro-level training',
        subtitle:
          'A compact resource hub for Divemaster and Instructor candidates, plus anyone who wants to sharpen the theory behind professional dive training.',
        introTitle: 'What this page covers',
        introBody:
          'The page groups the key prep topics into one simple library. The videos line up with pro-level courses, classroom support, and briefing practice.',
        prepTitle: 'Built for professional prep',
        prepBody:
          'Use the videos alongside your course materials, review them before teaching sessions, and share them when students need a deeper explanation of the concepts.',
        accessTitle: 'Access to the library',
        accessBody:
          'The full set is intended as training support for enrolled students and pro programs. Get in touch if you want to know which videos belong to your path.',
        ctaPrimary: 'View pro courses',
        ctaSecondary: 'Contact us',
        quickLinksTitle: 'Quick links',
        quickLinksBody: 'Useful shortcuts to the main pro-level pages on the site.',
      };

  const videos: TrainingVideo[] = [
    {
      title: isDutch ? 'Decompressietheorie en RDP' : 'Decompression theory and the RDP',
      description: isDutch
        ? 'Een heldere uitleg van basisprincipes voor duikplanning, nultijd en tabellengebruik.'
        : 'A clear walk-through of dive planning fundamentals, no-stop limits, and table use.',
      level: isDutch ? 'Divemaster' : 'Divemaster',
      duration: isDutch ? '18 min' : '18 min',
      access: isDutch ? 'Onderdeel van pro training' : 'Included in pro training',
    },
    {
      title: isDutch ? 'Duikfysiologie voor instructeurs' : 'Diving physiology for instructors',
      description: isDutch
        ? 'Belangrijke concepten die je nodig hebt om studenten veilig en eenvoudig uit te leggen waarom het lichaam reageert zoals het doet.'
        : 'Essential concepts for explaining to students why the body responds the way it does under pressure.',
      level: isDutch ? 'Instructor' : 'Instructor',
      duration: isDutch ? '22 min' : '22 min',
      access: isDutch ? 'Alleen voor cursusdeelnemers' : 'Course participants only',
    },
    {
      title: isDutch ? 'Duikfysica praktisch toegepast' : 'Diving physics made practical',
      description: isDutch
        ? 'Van druk en drijfvermogen tot warmteverlies en gaswetten, vertaald naar realistische duiksituaties.'
        : 'From pressure and buoyancy to heat loss and gas laws, explained through real dive scenarios.',
      level: isDutch ? 'Divemaster' : 'Divemaster',
      duration: isDutch ? '16 min' : '16 min',
      access: isDutch ? 'Aanbevolen studievideo' : 'Recommended study video',
    },
    {
      title: isDutch ? 'Uitrusting en pro-briefing' : 'Equipment and pro briefing lecture',
      description: isDutch
        ? 'Een overzicht van kit-checks, student-setups en de manier waarop je materiaal helder uitlegt tijdens een briefing.'
        : 'A walkthrough of gear checks, student setups, and how to explain equipment clearly during a briefing.',
      level: isDutch ? 'Instructor' : 'Instructor',
      duration: isDutch ? '20 min' : '20 min',
      access: isDutch ? 'Training support' : 'Training support',
    },
    {
      title: isDutch ? 'Noodprocedures en scenario training' : 'Emergency procedures and scenario drills',
      description: isDutch
        ? 'Herhaal de kern van noodrespons, rolverdeling en communicatie onder druk.'
        : 'Review emergency response basics, role assignment, and communication under pressure.',
      level: isDutch ? 'Divemaster / Instructor' : 'Divemaster / Instructor',
      duration: isDutch ? '14 min' : '14 min',
      access: isDutch ? 'Snel opfrissen' : 'Quick refresher',
    },
    {
      title: isDutch ? 'Teaching tips voor studenten' : 'Teaching tips for student support',
      description: isDutch
        ? 'Praktische tips om theorie begrijpelijk te maken en je studenten meer zelfvertrouwen te geven.'
        : 'Practical guidance for making theory easier to absorb and helping students build confidence.',
      level: isDutch ? 'Instructor' : 'Instructor',
      duration: isDutch ? '12 min' : '12 min',
      access: isDutch ? 'Extra lesmateriaal' : 'Extra learning support',
    },
  ];

  const quickLinks = [
    { label: isDutch ? 'Divemaster cursus' : 'Divemaster course', to: '/courses/divemaster' },
    { label: isDutch ? 'Instructor cursus' : 'Instructor course', to: '/courses/instructor' },
    { label: isDutch ? 'MSDT programma' : 'MSDT program', to: '/courses/msdt-program' },
    { label: isDutch ? 'Pro level cursussen' : 'Pro level courses', to: '/courses' },
    { label: isDutch ? 'Boeking / contact' : 'Booking / contact', to: '/booking' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950 to-background text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.18),transparent_34%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <Badge className="mb-5 border border-cyan-300/30 bg-cyan-400/15 text-cyan-100 hover:bg-cyan-400/20">
            {content.badge}
          </Badge>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50/85">
                {content.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                  <Link to="/courses">
                    {content.ctaPrimary}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/booking">{content.ctaSecondary}</Link>
                </Button>
              </div>
            </div>

            <Card className="border-white/10 bg-white/5 text-white shadow-2xl shadow-cyan-950/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{content.introTitle}</CardTitle>
                <CardDescription className="text-cyan-50/75">{content.quickLinksBody}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-cyan-50/85">
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                  <Video className="mt-0.5 h-5 w-5 text-cyan-300" />
                  <p>{content.introBody}</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-cyan-300" />
                  <p>{content.prepBody}</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                  <Users className="mt-0.5 h-5 w-5 text-cyan-300" />
                  <p>{content.accessBody}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-14">
          <div className="mb-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-white">{isDutch ? 'Video modules' : 'Video modules'}</h2>
            <p className="mt-3 text-base leading-7 text-slate-300">{content.prepTitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <Card
                key={video.title}
                className="border-white/10 bg-slate-900/75 text-white shadow-xl shadow-cyan-950/20 transition-transform duration-200 hover:-translate-y-1 hover:border-cyan-300/30"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl text-white">{video.title}</CardTitle>
                    <Badge variant="secondary" className="shrink-0 bg-cyan-400/15 text-cyan-100 hover:bg-cyan-400/20">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-300">{video.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 text-xs text-cyan-100/90">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{video.level}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{video.access}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <PlayCircle className="h-4 w-4 text-cyan-300" />
                    <span>{isDutch ? 'Leerdoel: theorie, briefing en praktijktoepassing' : 'Focus: theory, briefings, and practical application'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{content.accessTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-200">
              <p>{content.accessBody}</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{isDutch ? 'Geschikt als voorbereiding naast cursusboek en klassikale sessies.' : 'Use alongside your manual and classroom sessions.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{isDutch ? 'Handig voor herhaling voor lessen, assessments en teaching practice.' : 'Useful for review before lessons, assessments, and teaching practice.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{isDutch ? 'We koppelen de juiste extra resources aan je trainingsroute.' : 'We can point you to the right extra resources for your training route.'}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/75 text-white shadow-xl shadow-cyan-950/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{content.quickLinksTitle}</CardTitle>
              <CardDescription className="text-slate-300">{content.quickLinksBody}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default TrainingVideos;