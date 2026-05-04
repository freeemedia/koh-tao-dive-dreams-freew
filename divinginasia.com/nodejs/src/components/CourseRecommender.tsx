import React, { useState } from 'react';
import { Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const experienceOptions = [
  { value: "never", label: "Never dived before", icon: "🌟" },
  { value: "try-dive", label: "Done a try dive / Discover Scuba", icon: "🏊" },
  { value: "open-water", label: "Open Water certified", icon: "🤿" },
  { value: "advanced", label: "Advanced Open Water certified", icon: "🌊" },
  { value: "rescue", label: "Rescue Diver certified", icon: "🚨" },
];

const interestOptions = [
  "Marine life & photography",
  "Deep diving",
  "Wreck exploration",
  "Night diving",
  "Career in diving",
  "Just for fun",
];

const CourseRecommender = () => {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
        recommendation = "Based on your experience, I recommend starting with the **Open Water Diver** course! This is the foundational certification that will teach you the essential skills for safe diving. You'll learn everything from basic equipment use to underwater navigation, and you'll get to explore Koh Tao's beautiful coral reefs. The course takes 3-4 days and costs ฿9,500. It's perfect for beginners and will open up a whole new world underwater!";
      } else if (experience === "open-water") {
        recommendation = "With your Open Water certification, you're ready for the **Advanced Open Water** course! This intermediate level will take your skills to the next level with 5 adventure dives including deep diving and navigation. You'll explore deeper sites around Koh Tao and gain more confidence. The 2-day course costs ฿8,500 and will prepare you for more advanced diving experiences.";
      } else if (experience === "advanced") {
        recommendation = "As an Advanced Open Water diver, the **Rescue Diver** course would be an excellent next step! This advanced certification focuses on emergency response and problem-solving underwater. You'll learn how to handle dive emergencies and assist other divers. The 2-3 day course costs ฿9,500 and is essential for serious divers or those considering a career in diving.";
      } else if (experience === "rescue") {
        recommendation = "With your Rescue Diver certification, you might be interested in the **Divemaster** course if you're considering a career in diving! This professional-level certification takes 4-6 weeks and costs ฿32,000. It will prepare you to guide other divers and work in the dive industry. If you're just diving for fun, you can continue with specialty courses or just enjoy recreational diving!";
      } else {
        recommendation = "I'd recommend starting with the **Open Water Diver** course to get your basic certification. This will give you the foundation you need for safe and enjoyable diving in Koh Tao's amazing waters!";
      }
      
      setRecommendation(recommendation);
      setStep(4);
    } catch (error: any) {
      console.error("Error getting recommendation:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get recommendation. Please try again.",
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
    <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 text-white mb-16">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-8 w-8" />
        <h3 className="text-2xl font-bold">AI Course Recommender</h3>
      </div>
      <p className="text-cyan-100 mb-8">
        Not sure which course is right for you? Let our AI guide you to the perfect certification!
      </p>

      {/* Step 1: Experience */}
      {step === 1 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">What's your diving experience?</h4>
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
                    ? 'bg-white text-blue-700'
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
          <h4 className="text-lg font-semibold mb-4">What interests you about diving? (Select any)</h4>
          <div className="flex flex-wrap gap-3 mb-6">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full transition-all ${
                  interests.includes(interest)
                    ? 'bg-white text-blue-700'
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
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-cyan-50 transition-colors font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Goals */}
      {step === 3 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">What do you hope to achieve?</h4>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="e.g., I want to explore Koh Tao's famous dive sites and maybe see whale sharks..."
            className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
            rows={3}
          />
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Back
            </button>
            <button
              onClick={getRecommendation}
              disabled={isLoading}
              className="px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-cyan-50 transition-colors font-semibold flex items-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Getting Recommendation...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Get My Recommendation
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
              Your Personalized Recommendation
            </h4>
            <div className="prose prose-invert max-w-none">
              <p className="text-cyan-50 leading-relaxed whitespace-pre-line">{recommendation}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Start Over
            </button>
            <a
              href="#contact"
              className="px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-cyan-50 transition-colors font-semibold"
            >
              Book This Course
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRecommender;
