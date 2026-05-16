import React, { useState } from 'react';
import { Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const EXPERIENCE_OPTIONS = {
  en: [
    { value: 'never', label: 'Never dived before', icon: '🌟' },
    { value: 'try-dive', label: 'Done a try dive / Discover Scuba', icon: '🏊' },
    { value: 'open-water', label: 'Open Water certified', icon: '🤿' },
    { value: 'advanced', label: 'Advanced Open Water certified', icon: '🌊' },
    { value: 'rescue', label: 'Rescue Diver certified', icon: '🚨' },
  ],
  nl: [
    { value: 'never', label: 'Nooit eerder gedoken', icon: '🌟' },
    { value: 'try-dive', label: 'Een proefduik / Discover Scuba gedaan', icon: '🏊' },
    { value: 'open-water', label: 'Open Water gebrevetteerd', icon: '🤿' },
    { value: 'advanced', label: 'Advanced Open Water gebrevetteerd', icon: '🌊' },
    { value: 'rescue', label: 'Rescue Diver gebrevetteerd', icon: '🚨' },
  ],
};

const INTEREST_OPTIONS = {
  en: [
    'Marine life & photography',
    'Deep diving',
    'Wreck exploration',
    'Night diving',
    'Career in diving',
    'Just for fun',
  ],
  nl: [
    'Onderwaterleven en fotografie',
    'Diepduiken',
    'Wrakverkenning',
    'Nachtduiken',
    'Carriere in de duikwereld',
    'Gewoon voor de lol',
  ],
};

const UI_TEXT = {
  en: {
    title: 'AI Course Recommender',
    subtitle: 'Not sure which course is right for you? Let our AI guide you to the perfect certification!',
    step1: "What's your diving experience?",
    step2: 'What interests you about diving? (Select any)',
    step3: 'What do you hope to achieve?',
    placeholder: "e.g., I want to explore Koh Tao's famous dive sites and maybe see whale sharks...",
    back: 'Back',
    continue: 'Continue',
    loading: 'Getting Recommendation...',
    getRecommendation: 'Get My Recommendation',
    personalized: 'Your Personalized Recommendation',
    startOver: 'Start Over',
    bookCourse: 'Book This Course',
    errorTitle: 'Error',
    errorDesc: 'Failed to get recommendation. Please try again.',
  },
  nl: {
    title: 'AI Cursusadviseur',
    subtitle: 'Niet zeker welke cursus bij je past? Laat onze AI je begeleiden naar de perfecte certificering!',
    step1: 'Wat is je duikervaring?',
    step2: 'Wat interesseert je aan duiken? (Kies er een of meer)',
    step3: 'Wat wil je graag bereiken?',
    placeholder: 'bijv. Ik wil de bekende duiklocaties van Koh Tao verkennen en misschien walvishaaien zien...',
    back: 'Terug',
    continue: 'Verder',
    loading: 'Advies wordt opgehaald...',
    getRecommendation: 'Geef mijn advies',
    personalized: 'Jouw persoonlijke advies',
    startOver: 'Opnieuw beginnen',
    bookCourse: 'Boek deze cursus',
    errorTitle: 'Fout',
    errorDesc: 'Advies ophalen mislukt. Probeer het opnieuw.',
  },
};

const CourseRecommender = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const lang = isDutch ? 'nl' : 'en';

  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const experienceOptions = EXPERIENCE_OPTIONS[lang];
  const interestOptions = INTEREST_OPTIONS[lang];
  const ui = UI_TEXT[lang];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const getRecommendation = async () => {
    setIsLoading(true);
    try {
      // Simple rule-based recommendation
      let recommendation = "";
      
      if (experience === "never" || experience === "try-dive") {
        recommendation = isDutch
          ? 'Op basis van je ervaring raad ik je aan te starten met de **Open Water Diver** cursus! Dit is de basiscertificering waarmee je alle essentiele vaardigheden voor veilig duiken leert. Je leert alles van materiaalgebruik tot onderwaternavigatie en je verkent de prachtige koraalriffen van Koh Tao. De cursus duurt 3-4 dagen en kost ฿11,000. Perfect voor beginners en de start van een hele nieuwe onderwaterwereld!'
          : "Based on your experience, I recommend starting with the **Open Water Diver** course! This is the foundational certification that will teach you the essential skills for safe diving. You'll learn everything from basic equipment use to underwater navigation, and you'll get to explore Koh Tao's beautiful coral reefs. The course takes 3-4 days and costs ฿11,000. It's perfect for beginners and will open up a whole new world underwater!";
      } else if (experience === "open-water") {
        recommendation = isDutch
          ? 'Met je Open Water-certificering ben je klaar voor de **Advanced Open Water** cursus! Dit intermediate niveau brengt je vaardigheden naar een hoger niveau met 5 adventure dives, waaronder diepduiken en navigatie. Je verkent diepere duiklocaties rond Koh Tao en bouwt meer vertrouwen op. De 2-daagse cursus kost ฿10,000 en bereidt je voor op meer geavanceerde duikervaringen.'
          : "With your Open Water certification, you're ready for the **Advanced Open Water** course! This intermediate level will take your skills to the next level with 5 adventure dives including deep diving and navigation. You'll explore deeper sites around Koh Tao and gain more confidence. The 2-day course costs ฿10,000 and will prepare you for more advanced diving experiences.";
      } else if (experience === "advanced") {
        recommendation = isDutch
          ? 'Als Advanced Open Water-duiker is de **Rescue Diver** cursus een uitstekende volgende stap! Deze geavanceerde certificering focust op noodrespons en probleemoplossing onder water. Je leert duiknoodsituaties beheersen en andere duikers helpen. De cursus duurt 2-3 dagen, kost ฿10,000 en is essentieel voor serieuze duikers of als je een carriere in de duikwereld overweegt.'
          : "As an Advanced Open Water diver, the **Rescue Diver** course would be an excellent next step! This advanced certification focuses on emergency response and problem-solving underwater. You'll learn how to handle dive emergencies and assist other divers. The 2-3 day course costs ฿10,000 and is essential for serious divers or those considering a career in diving.";
      } else if (experience === "rescue") {
        recommendation = isDutch
          ? 'Met je Rescue Diver-certificering kan de **Divemaster** cursus interessant zijn als je een carriere in de duikwereld overweegt! Deze professionele certificering duurt 4-6 weken en kost ฿41,000. Je leert andere duikers begeleiden en werken in de duikindustrie. Duik je vooral voor je plezier? Dan kun je doorgaan met specialties of lekker recreatief blijven duiken.'
          : "With your Rescue Diver certification, you might be interested in the **Divemaster** course if you're considering a career in diving! This professional-level certification takes 4-6 weeks and costs ฿41,000. It will prepare you to guide other divers and work in the dive industry. If you're just diving for fun, you can continue with specialty courses or just enjoy recreational diving!";
      } else {
        recommendation = isDutch
          ? 'Ik raad aan te starten met de **Open Water Diver** cursus voor je basiscertificering. Daarmee leg je het fundament voor veilig en leuk duiken in het geweldige water rond Koh Tao!'
          : "I'd recommend starting with the **Open Water Diver** course to get your basic certification. This will give you the foundation you need for safe and enjoyable diving in Koh Tao's amazing waters!";
      }
      
      setRecommendation(recommendation);
      setStep(4);
    } catch (error: any) {
      console.error("Error getting recommendation:", error);
      toast({
        title: ui.errorTitle,
        description: error.message || ui.errorDesc,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setExperience("");
    setInterests([]);
    setGoals("");
    setRecommendation("");
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-16">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-8 w-8" />
        <h3 className="text-2xl font-bold">{ui.title}</h3>
      </div>
      <p className="text-blue-100 mb-8">
        {ui.subtitle}
      </p>

      {/* Step 1: Experience */}
      {step === 1 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">{ui.step1}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {experienceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setExperience(option.value);
                  setStep(2);
                }}
                className={`p-4 rounded-lg text-left transition-all flex items-center gap-3 ${
                  experience === option.value
                    ? 'bg-background text-blue-700'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="font-medium">{option.label}</span>
                <ChevronRight className="h-5 w-5 ml-auto" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Interests */}
      {step === 2 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">{ui.step2}</h4>
          <div className="flex flex-wrap gap-3 mb-6">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full transition-all ${
                  interests.includes(interest)
                    ? 'bg-background text-blue-700'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              {ui.back}
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-background text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              {ui.continue}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Goals */}
      {step === 3 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">{ui.step3}</h4>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder={ui.placeholder}
            className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
            rows={3}
          />
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              {ui.back}
            </button>
            <button
              onClick={getRecommendation}
              disabled={isLoading}
              className="px-6 py-3 bg-background text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {ui.loading}
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  {ui.getRecommendation}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Recommendation */}
      {step === 4 && recommendation && (
        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {ui.personalized}
            </h4>
            <div className="prose prose-invert max-w-none">
              <p className="text-blue-50 leading-relaxed whitespace-pre-line">{recommendation}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              {ui.startOver}
            </button>
            <a
              href="/#contact"
              className="px-6 py-3 bg-background text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              {ui.bookCourse}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRecommender;
